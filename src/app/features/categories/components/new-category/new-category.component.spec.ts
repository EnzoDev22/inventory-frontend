import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/shared/material.module';
import { NewCategoryComponent } from './new-category.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NewCategoryComponent', () => {
  let component: NewCategoryComponent;
  let fixture: ComponentFixture<NewCategoryComponent>;

  beforeEach(() => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
    declarations: [NewCategoryComponent],
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
    fixture = TestBed.createComponent(NewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
