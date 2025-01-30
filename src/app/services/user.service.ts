import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    {
      id: 1,
      name: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
      password: '123456'
    },
    {
      id: 2,
      name: 'Pepa',
      lastname: 'Rodriguez',
      email: 'pepita@example.com',
      username: 'pepotas',
      password: 'abcdef'
    },
  ];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
