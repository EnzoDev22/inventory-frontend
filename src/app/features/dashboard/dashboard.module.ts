import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryModule } from '../categories/category.module';
import { ProductModule } from '../products/product.module';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CategoryModule,
    ProductModule,
    MaterialModule
  ]
})
export class DashboardModule { }
