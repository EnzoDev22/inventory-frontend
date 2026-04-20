import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { CategoryComponent } from '../category/components/category/category.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';



@NgModule({
  declarations: [
    ProductComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
