import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { keycloakProviders } from './core/auth/keycloak.config';
import { DashboardModule } from './features/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule
  ],
  providers: [
    ...keycloakProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
