import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import * as childProcess from 'child_process';
import { Observable } from 'rxjs';
import { json } from '@angular-devkit/core';
import * as path from 'path';
import * as fs from 'fs';


const featuresDir = path.resolve(__dirname, '../../../libs');

interface Options extends json.JsonObject {
  buildDir: string;
}

export default createBuilder((options: Options, context) => {
  context.logger.info(`Build features.json ...`);
  const config = getFeatures()
    .reduce((acc, feature) => ({
      ...acc,
      [feature]: getFeatureConfig(feature),
    }), {});

  const buildDir = path.resolve(__dirname, '../../../', options.buildDir)
  fs.writeFileSync(path.resolve(buildDir, 'features.json'), JSON.stringify(config));
  return new Observable<BuilderOutput>((observer) => {
    observer.next({ success: true });
    observer.complete();
  });
});

function getFeatures() {
  return fs.readdirSync(featuresDir)
    .filter((item) => {
      return item[0] !== '.'
        && fs.readdirSync(path.resolve(featuresDir, item)).indexOf('feature.json') !== -1
    });

}

function getFeatureConfig(feature: string): Record<string, unknown> {
  const configPath = path.resolve(featuresDir, feature, 'feature.json');
  return JSON.parse(fs.readFileSync(configPath).toString());
}
