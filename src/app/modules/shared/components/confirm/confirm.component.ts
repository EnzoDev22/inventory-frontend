import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {
  
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  
  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close(3);
  }

  delete(){

    if(this.data != null){
      this.categoryService.deleteCategory(this.data.id)
        .subscribe( (data : any) => {
          this.dialogRef.close(1);
        }, (error : any) => {
          this.dialogRef.close(2);
        })
    }else{
      this.dialogRef.close(2);
    }

  }

}
