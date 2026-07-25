import { TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    const keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', [
      'getUserRoles'
    ]);
    keycloakServiceSpy.getUserRoles.and.returnValue([]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: KeycloakService,
          useValue: keycloakServiceSpy
        }
      ]
    });
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
