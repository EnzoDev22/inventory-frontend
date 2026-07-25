import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../shared/material.module';
import { NewProductComponent } from './new-product.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;

  beforeEach(() => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
    declarations: [NewProductComponent],
    imports: [MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule],
    providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: null },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
