import { Component } from '@angular/core';
import { NAV_MENU_LINKS } from './nav-menu-links';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  links = NAV_MENU_LINKS;
}
