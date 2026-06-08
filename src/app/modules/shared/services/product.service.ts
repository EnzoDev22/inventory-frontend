import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const base_url = "http://localhost:8080/api/v1";
const BASE_URL = 'http://spring-boot-app-497700.rj.r.appspot.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * get all the products
   */
  getProducts(){
    const endpoint = `${BASE_URL}/products`;
    return this.http.get(endpoint);
  }

  /**
   * save the product
   * @param body 
   */
  saveProduct(body: any){
    const endpoint = `${BASE_URL}/products`;
    return this.http.post(endpoint, body);
  }

  /**
   * update the product
   */
  updateProduct(body:any, id:any){
    const endpoint = `${BASE_URL}/products/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete the product
   */
  deleteProduct(id: any) {
    const endpoint = `${BASE_URL}/products/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * search products by name
   * @param name 
   */
  getProductsByName(name: string) {
    const endpoint = `${BASE_URL}/products/filter/${name}`;
    return this.http.get(endpoint);
  }

  /**
   * export products to excel
   * @returns 
   */
  exportProducts(){
    const endpoint = `${BASE_URL}/products/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
  
}
