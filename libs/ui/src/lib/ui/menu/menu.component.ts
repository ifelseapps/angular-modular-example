import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { IMenuItem } from '@cadres/core';

type MenuOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  constructor(private _zone: NgZone, private _el: ElementRef<HTMLElement>) { }

  @Input() orientation: MenuOrientation;
  @Input() items: IMenuItem[];

  ngAfterViewInit() {
    this._zone.runOutsideAngular(() => {
      this._el.nativeElement.addEventListener('mouseover', this.onMouseOver);
      this._el.nativeElement.addEventListener('mouseleave', this.onMouseLeave);
    });
  }

  ngOnDestroy() {
    this._el.nativeElement.removeEventListener('mouseover', this.onMouseOver);
    this._el.nativeElement.removeEventListener('mouseleave', this.onMouseLeave);
  }

  onMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLAnchorElement;
    if (!target.closest('.menu__link')) {
      return;
    }

    const item = target.parentElement;
    const allItems = Array.from(item.closest('.menu').children);
    allItems.forEach(it => it.classList.remove('menu__item_active'));
    item.classList.add('menu__item_active');
  }

  onMouseLeave = () => {
    this._el.nativeElement
      .querySelectorAll('.menu__item_active')
      .forEach(it => it.classList.remove('menu__item_active'));

  }
}
