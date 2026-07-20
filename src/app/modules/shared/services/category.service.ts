import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment.local';

const BASE_URL = environment.apiUrl;

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

  /**
   * get category by id
   * @param id 
   * @returns 
   */
  getCategoryById(id: number){
    const endpoint = `${BASE_URL}/categories/${id}`;
    return this.http.get(endpoint);
  }

  /**
   * export categories to Excel
   * @returns 
   */
  exportCategories(){
    const endpoint = `${BASE_URL}/categories/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }

}
