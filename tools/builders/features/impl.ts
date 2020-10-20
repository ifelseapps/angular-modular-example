import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { json } from '@angular-devkit/core';
import * as path from 'path';
import * as fs from 'fs';


const featuresDir = path.resolve(__dirname, '../../../libs');

interface IFeatureManifest {
  name: string;
  version: string;
  module: {
    name: string;
    path: string;
  };
  menu: {
    name: string;
    path: string;
  };
}

interface Options extends json.JsonObject {
  buildDir: string;
}

export default createBuilder((options: Options, context) => {
  context.logger.info(`Build features.json ...`);
  const config = getFeatures()
    .reduce<Record<string, IFeatureManifest>>((acc, feature) => ({
      ...acc,
      [feature]: getFeatureConfig(feature),
    }), {});

  const buildDir = path.resolve(__dirname, '../../../', options.buildDir)
  fs.writeFileSync(path.resolve(buildDir, 'assets', 'features.json'), JSON.stringify(config));
  context.logger.info(`Build app-routing.module.ts ...`);
  fs.writeFileSync(path.resolve(buildDir, 'app', 'app-routing.module.ts'), getRoutingModule(config));
  return new Observable<BuilderOutput>((observer) => {
    observer.next({ success: true });
    observer.complete();
  });
});

function getFeatures(): string[] {
  return fs.readdirSync(featuresDir)
    .filter((item) => {
      return item[0] !== '.'
        && fs.readdirSync(path.resolve(featuresDir, item)).indexOf('feature.json') !== -1
    });
}

function getFeatureConfig(feature: string): IFeatureManifest {
  const configPath = path.resolve(featuresDir, feature, 'feature.json');
  return JSON.parse(fs.readFileSync(configPath).toString());
}

function getRoutingModule(config: Record<string, IFeatureManifest>): string {
  const header = `
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
  `;
  const footer = `
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
  `;
  const routes = Object.keys(config).reduce((acc, featureId) => [
    ...acc,
    `
    {
      path: '${featureId}',
      loadChildren: () => import('${config[featureId].module.path}').then(m => m.${config[featureId].module.name}),
    },
    `
  ], []);
  const body = `const routes: Route[] = [${routes.join("\n")}];`;

  return [header, body, footer].join("\n");
}
