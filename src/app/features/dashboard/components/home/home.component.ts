import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProductElement } from 'src/app/features/products/product/product.component';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  
  chartBar:any;
  chartDoughnut:any;
  private productService:ProductService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

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
      
      const nameProduct: String[] = [];
      const quantityProduct: number[] = [];

      if(resp.metadata[0].code == "00"){
        let listCProducts = resp.productResponse.products;
        
        listCProducts.forEach ((element : ProductElement) => {
          nameProduct.push(element.name);
          quantityProduct.push(element.quantity);
        });

        //create the bar chart
        this.chartBar = new Chart('canvas-bar', {
          type: 'bar',
          data: {
            labels: nameProduct,
            datasets: [
              {label: 'Productos', data: quantityProduct}
            ]
          }
        })

        //create the doughnut chart
        this.chartDoughnut = new Chart('canvas-doughnut', {
          type: 'doughnut',
          data: {
            labels: nameProduct,
            datasets: [
              {label: 'Productos', data: quantityProduct}
            ]
          }
        })

      }
        
    }

}
