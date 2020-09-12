import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IMenuItem } from '@cadres/core';

@Component({
  selector: 'vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalMenuComponent implements OnInit {
  constructor() { }

  @Input() items: IMenuItem[];

  ngOnInit(): void {
  }
}
