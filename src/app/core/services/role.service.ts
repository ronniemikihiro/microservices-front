import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../entities/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url: string = environment.apiURLBase + '/auth/role';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Role[]> {
    return this.http.get<any>(this.url);
  }
  
}
