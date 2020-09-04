import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@cadres/api-interfaces';
import { ContextService } from './context.service';

@Component({
  selector: 'cadres-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _context: ContextService) {}

  readonly menu$ = this._context.getMenu$();
}
