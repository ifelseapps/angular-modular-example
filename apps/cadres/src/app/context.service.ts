import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IMenuItem {
  name: string;
  path: string;
  children?: IMenuItem[];
}

export type Features = Record<string, {
  name: string;
  version: string;
  menu: IMenuItem;
}>;

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ContextService {
  constructor(private _http: HttpClient) { }

  private _features$ = this.getFeatures$();

  getFeatures$() {
    return this._http.get<Features>('/assets/features.json')
  }

  getMenu$() {
    return this._features$.pipe(
      map((features) => {
        return Object.keys(features).reduce((acc, feature) => [...acc, features[feature].menu], [])
      })
    );
  }
}
