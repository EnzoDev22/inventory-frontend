import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm : FormGroup = new FormGroup({});
  public estadoFormulario: string = "";
  public categories: Category[] = [];
  public selectedFile: any;
  public nameImg: String ="";

  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef)
  public data = inject(MAT_DIALOG_DATA);


  ngOnInit(): void {
    this.estadoFormulario = "Agregar"
    this.getCategories();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      quantity: this.productForm.get('quantity')?.value,
      categoryId: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('quantity', data.quantity);
    uploadImageData.append('categoryId', data.categoryId);
    uploadImageData.append('picture', data.picture, data.picture.name);

    //call the service to save a product
    this.productService.saveProduct(uploadImageData)
      .subscribe( (response : any) => {
        console.log("Producto guardado: ", response);
        this.dialogRef.close(1);
      }, (error : any) => {
        console.error("Error: ", error)
      });

  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe( (data : any) => {
        console.log("Categorías: ", data);
        this.categories = data.categoryResponse.category;
      }, (error : any) => {
        console.error("Error: ", error)
      });
  }

  onFileChanged($event: any) {
    this.selectedFile = $event.target.files[0];
    this.nameImg = this.selectedFile.name;
  }

}

export interface Category {
  id: number;
  name: string;
  description: string;
}
