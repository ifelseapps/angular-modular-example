import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { IMenuItem } from '@cadres/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements AfterViewInit {
  constructor(private _zone: NgZone) { }

  @Input() items: IMenuItem[];

  @ViewChild('menu') menuRef: ElementRef<HTMLElement>;

  readonly path$ = new BehaviorSubject<string[]>([]);

  ngAfterViewInit() {
    this._zone.runOutsideAngular(() => {
      this.menuRef.nativeElement.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('main-menu__link')) {
          return;
        }

        const currentItem = target.parentElement;

        this.menuRef.nativeElement.querySelectorAll('.main-menu__item_active')
          .forEach(item => {
            if (item !== currentItem) {
              item.classList.remove('main-menu__item_active');
            }
          })
        currentItem.classList.add('main-menu__item_active');
      });
      this.menuRef.nativeElement.addEventListener('mouseleave', () => {
        this.menuRef.nativeElement.querySelectorAll('.main-menu__item_active')
          .forEach(item => item.classList.remove('main-menu__item_active'));
      });
    });
  }
}
