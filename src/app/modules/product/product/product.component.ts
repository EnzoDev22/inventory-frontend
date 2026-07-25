import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    standalone: false
})

export class ProductComponent implements OnInit {

  isAdmin:boolean = false;
  private productService:ProductService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private utilService = inject(UtilService);

  ngOnInit(): void {
    this.isAdmin = this.utilService.isAdmin();
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
        //element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      });
      
      //set the datasource of the table
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }  
  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent, {
          width: '450px'
        });
    
    dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Producto creado exitosamente", "Exitosa");
          this.getProducts();
        }else if(result == 2){
          this.openSnackBar("Error al crear el producto", "Error");
        }

    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  edit(id: number,name: string,price: number,quantity: number,category: any) {
    const dialogRef = this.dialog.open(NewProductComponent, {
          width: '450px',
          data:{
            id: id,
            name: name,
            price: price,
            quantity: quantity,
            category: category
          }
        });
    
    dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Producto actualizado exitosamente", "Exito");
          this.getProducts();
        }else if(result == 2){
          this.openSnackBar("Error al actualizar el producto", "Error");
        }

    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
          width: '450px',
          data:{
            id: id,
            module: "product"
          }
        });
    
    dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Producto eliminado exitosamente", "Exito");
          this.getProducts();
        }else if(result == 2){
          this.openSnackBar("Error al eliminar el producto", "Error");
        }

    });
  }

  search(name: string){
    if(name.length === 0){
      return this.getProducts();
    }else{
      this.productService.getProductsByName(name)
        .subscribe( (data : any) => {
          this.processProductsResponse(data);
        }, (error : any) => {
          console.error("Error: ", error)
        })
    }
  }

  exportToExcel(){
    this.productService.exportProducts()
      .subscribe( (data:any) => {
        let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement('a');
        anchor.download = 'products.xlsx';
        anchor.href = fileUrl;
        document.body.appendChild(anchor);
        anchor.click();

        this.openSnackBar("Archivo exportado exitosamente", "Exito");
      }, (error:any) => {
        console.error("Error: ", error);
        this.openSnackBar("Error al exportar el archivo", "Error");
      })
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