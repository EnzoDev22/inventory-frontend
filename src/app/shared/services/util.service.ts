import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  private readonly keycloak = inject(Keycloak);

  getRoles(): string[] {
    const resourceRoles = Object.values(
      this.keycloak.resourceAccess ?? {}
    ).flatMap(access => access.roles ?? []);
    const realmRoles = this.keycloak.realmAccess?.roles ?? [];

    return [...resourceRoles, ...realmRoles];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('admin');
  }
}
