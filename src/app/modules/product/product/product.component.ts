import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  private productService:ProductService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }
  
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  

  getProducts(){
    this.productService.getProducts()
      .subscribe( (data : any) => {
        console.log("Productos: ", data);
        this.processProductsResponse(data);
      }, (error : any) => {
        console.error("Error: ", error)
      })
  }

  processProductsResponse(resp:any){
    const dateProduct: ProductElement [] = [];
    if(resp.metadata[0].code == "00"){
      let listProducts = resp.productResponse.products;
      
      listProducts.forEach ((element : ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      });
      
      //set the datasource of the table
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }  
  }
}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: any;
  picture: any;
}