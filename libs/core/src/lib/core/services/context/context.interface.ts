import { Observable } from 'rxjs';
import { IMenuItem } from './menu.interface';

export interface IContext {
  getMenu$(): Observable<IMenuItem[]>;
}
