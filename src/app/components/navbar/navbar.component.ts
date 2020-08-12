import { Component } from '@angular/core';
import { NAVBAR_LINKS } from './navbar-links';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links = NAVBAR_LINKS;
  showMenu = false;
}
