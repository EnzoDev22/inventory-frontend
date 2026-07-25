import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../shared/material.module';
import { UtilService } from '../../shared/services/util.service';
import { ProductComponent } from './product.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [ProductComponent],
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
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
