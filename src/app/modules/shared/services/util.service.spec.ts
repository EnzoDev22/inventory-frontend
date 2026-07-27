import { TestBed } from '@angular/core/testing';
import Keycloak from 'keycloak-js';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    const keycloakMock = {
      realmAccess: {
        roles: []
      },
      resourceAccess: {}
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Keycloak,
          useValue: keycloakMock
        }
      ]
    });
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should identify an admin role', () => {
    const keycloak = TestBed.inject(Keycloak);
    keycloak.realmAccess = { roles: ['admin'] };

    expect(service.isAdmin()).toBeTrue();
  });
});
