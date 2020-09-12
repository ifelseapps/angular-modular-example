import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IContext, IMenuItem } from '@cadres/core';

export type Features = Record<string, {
  name: string;
  version: string;
  menu: IMenuItem;
}>;

const systemItems: IMenuItem[] = [
  {
    name: 'Справка',
    path: '/help/',
    children: [
      {
        name: 'Руководство пользователя',
        path: '/help/manual/'
      },
      {
        name: 'Модули',
        path: '/help/modules/',
      },
      {
        name: 'О программе',
        path: '/help/about/',
      },
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class ContextService implements IContext {
  constructor(private _http: HttpClient) { }

  private _features$ = this.getFeatures$();

  private getFeatures$() {
    return this._http.get<Features>('/assets/features.json')
  }

  getMenu$() {
    return this._features$.pipe(
      map((features) => {
        const items = Object.keys(features).reduce<IMenuItem[]>((acc, feature) => [...acc, features[feature].menu], []);
        return items.concat(systemItems);
      })
    );
  }
}
