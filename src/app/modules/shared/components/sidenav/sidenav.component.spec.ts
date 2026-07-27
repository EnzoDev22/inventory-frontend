import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import Keycloak from 'keycloak-js';

import { MaterialModule } from '../../material.module';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(() => {
    const keycloakMock = {
      tokenParsed: {
        preferred_username: 'test-user'
      },
      logout: jasmine.createSpy('logout')
    };

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [SidenavComponent],
      providers: [
        {
          provide: Keycloak,
          useValue: keycloakMock
        }
      ]
    });
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the username from the token', () => {
    expect(component.username).toBe('test-user');
  });
});
