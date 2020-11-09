import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageUser } from '../entities/pages/page-user';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.apiURLBase + '/auth/user-system';

  constructor(private http: HttpClient) { }

  list(page, size): Observable<PageUser> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  findById(id: number) : Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
  
  save(userSystem: User) : Observable<User> {
    return userSystem.id ? this.http.post<User>(this.url, userSystem)
      : this.http.put<User>(this.url, userSystem);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  
}
