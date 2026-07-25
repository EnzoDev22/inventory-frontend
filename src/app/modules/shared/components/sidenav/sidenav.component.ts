import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    standalone: false
})
export class SidenavComponent implements OnInit {
  
  mobileQuery: MediaQueryList;
  username: string = "";
  email: string = "";
  private keycloakService = inject(KeycloakService);

  menuNav = [
    {name: 'Home', route: 'home', icon: 'home'},
    {name: 'Categories', route:'category', icon:'category'},
    {name: 'Products', route:'product', icon:'production_quantity_limits'},
  ];
  
  constructor(media:MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
   }
    
  ngOnInit(): void {
    this.username = this.keycloakService.getUsername() || '';
  }

  logout() {
    this.keycloakService.logout();
  }
}
