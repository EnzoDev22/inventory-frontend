import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';

import { MaterialModule } from '../../material.module';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(() => {
    const keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', [
      'getUsername',
      'logout'
    ]);
    keycloakServiceSpy.getUsername.and.returnValue('test-user');

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [SidenavComponent],
      providers: [
        {
          provide: KeycloakService,
          useValue: keycloakServiceSpy
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
});
