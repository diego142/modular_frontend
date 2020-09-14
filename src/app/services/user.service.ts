import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersList: User[];
  readonly URL_API = 'http://localhost:3000/foroqci/api/user';

  constructor(private http: HttpClient) {
   }

  getUsers() {
    return this.http.get<Response<User []>>(this.URL_API);
  }

  getUser(email: string) {
    return this.http.get<Response<User>>(this.URL_API + `/${email}`);
  }

  getUserById(id: string) {
    return this.http.get<Response<User>>(this.URL_API + `/id/${id}`);
  }

  postUser(user: User) {
    return this.http.post<Response<User>>(this.URL_API, user);
  }

  updateUser(user: User) {
    return this.http.put<Response<User>>(this.URL_API, user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }

}
