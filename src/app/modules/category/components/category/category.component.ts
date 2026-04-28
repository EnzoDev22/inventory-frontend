import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/modules/shared/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  isAdmin:boolean = false;
  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private utilService = inject(UtilService);

  
  ngOnInit(): void {
    this.isAdmin = this.utilService.isAdmin();
    console.log("isAdmin: ", this.isAdmin);
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories() : void{
    this.categoryService.getCategories()
      .subscribe( (data : any) => {
        this.processCategoriesResponse(data);
      }, (error : any) => {
        console.error("Error: ", error)
      })
  }

  processCategoriesResponse(resp:any){

    const dataCategory: CategoryElement [] = [];

    if(resp.metadata[0].code == "00"){

      let listCategories = resp.categoryResponse.category;

      listCategories.forEach ((element : CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
    }

  }

  openCategoryDialog(){
    
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Categoría creada exitosamente", "Exitosa");
          this.getCategories();
        }else if(result == 2){
          this.openSnackBar("Error al crear la categoría", "Error");
        }

    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  edit(id:number, name:string, description:string){

    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data:{ id:id, name:name, description:description}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Categoría actualizada exitosamente", "Exito");
          this.getCategories();
        }else if(result == 2){
          this.openSnackBar("Error al actualizar la categoría", "Error");
        }

    });

  }

  delete(id:number){
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data:{ id:id, module: "category"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Categoría eliminada exitosamente", "Exito");
          this.getCategories();
        }else if(result == 2){
          this.openSnackBar("Error al eliminar la categoría", "Error");
        }

    });

  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.getCategories();
    }

    this.categoryService.getCategoryById(Number(termino))
      .subscribe( (resp : any) => {
        console.log(resp);
        this.processCategoriesResponse(resp);
      }, (error : any) => {
        error.error.metadata[0].code == "01" ? this.openSnackBar("No se encontró la categoría", "Error") : this.openSnackBar("No se encontro la categoría", "Error");
      }
    );
  }

  exportToExcel(){
    this.categoryService.exportCategories()
      .subscribe( (data:any) => {
        let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement('a');
        anchor.download = 'categories.xlsx';
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

export interface CategoryElement {
  description:string;
  id:number;
  name:string;
}