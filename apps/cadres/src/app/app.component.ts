import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IContext, CONTEXT } from '@cadres/core';

@Component({
  selector: 'cadres-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(@Inject(CONTEXT) private _context: IContext) {}

  readonly menu$ = this._context.getMenu$();
}
