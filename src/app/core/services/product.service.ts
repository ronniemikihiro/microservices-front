import { environment } from './../../../environments/environment';
import { Product } from '../entities/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageProduct } from '../entities/pages/page-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = environment.apiURLBase + '/product/product';

  constructor(private http: HttpClient) { }

  list(page, size): Observable<PageProduct> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  findById(id: number) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
  
  save(product: Product) : Observable<Product> {
    return product.id ? this.http.post<Product>(this.url, product)
      : this.http.put<Product>(this.url, product);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  
}
