import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  /**
   * get all categories
   */
  getCategories(){

    const endpoint = `${BASE_URL}/categories`;
    return this.http.get(endpoint);

  }
  
  /**
   * save the categories
   */

  saveCategory(body:any){
    const endpoint = `${BASE_URL}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * update category
   */
  updateCategory(id: number, body:any){
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete category
   */
  deleteCategory(id: number){
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.delete(endpoint);
  }

  getCategoryById(id: number){
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.get(endpoint);
  }

}
