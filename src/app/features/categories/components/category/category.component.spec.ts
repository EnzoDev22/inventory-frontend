import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/shared/material.module';
import { UtilService } from 'src/app/shared/services/util.service';
import { CategoryComponent } from './category.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [CategoryComponent],
    imports: [MaterialModule,
        NoopAnimationsModule],
    providers: [
        {
            provide: UtilService,
            useValue: { isAdmin: () => false }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
