"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var architect_1 = require("@angular-devkit/architect");
var rxjs_1 = require("rxjs");
var path = require("path");
var fs = require("fs");
var featuresDir = path.resolve(__dirname, '../../../libs');
exports["default"] = architect_1.createBuilder(function (options, context) {
    context.logger.info("Build features.json ...");
    var config = getFeatures()
        .reduce(function (acc, feature) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[feature] = getFeatureConfig(feature), _a)));
    }, {});
    var buildDir = path.resolve(__dirname, '../../../', options.buildDir);
    fs.writeFileSync(path.resolve(buildDir, 'assets', 'features.json'), JSON.stringify(config));
    context.logger.info("Build app-routing.module.ts ...");
    fs.writeFileSync(path.resolve(buildDir, 'app', 'app-routing.module.ts'), getRoutingModule(config));
    return new rxjs_1.Observable(function (observer) {
        observer.next({ success: true });
        observer.complete();
    });
});
function getFeatures() {
    return fs.readdirSync(featuresDir)
        .filter(function (item) {
        return item[0] !== '.'
            && fs.readdirSync(path.resolve(featuresDir, item)).indexOf('feature.json') !== -1;
    });
}
function getFeatureConfig(feature) {
    var configPath = path.resolve(featuresDir, feature, 'feature.json');
    return JSON.parse(fs.readFileSync(configPath).toString());
}
function getRoutingModule(config) {
    var header = "\nimport { NgModule } from '@angular/core';\nimport { Route, RouterModule } from '@angular/router';\nimport { CommonModule } from '@angular/common';\n  ";
    var footer = "\n@NgModule({\n  imports: [CommonModule, RouterModule.forRoot(routes)],\n  exports: [RouterModule],\n})\nexport class AppRoutingModule {}\n  ";
    var routes = Object.keys(config).reduce(function (acc, featureId) { return __spreadArrays(acc, [
        "\n    {\n      path: '" + featureId + "',\n      loadChildren: () => import('" + config[featureId].module.path + "').then(m => m." + config[featureId].module.name + "),\n    },\n    "
    ]); }, []);
    var body = "const routes: Route[] = [" + routes.join("\n") + "];";
    return [header, body, footer].join("\n");
}
