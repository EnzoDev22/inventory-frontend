import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: 'inventory',
        clientId: 'angular-client'
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  providers: [
    provideAppInitializer(() => {
        const initializerFn = (initializeKeycloak)(inject(KeycloakService));
        return initializerFn();
      })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
