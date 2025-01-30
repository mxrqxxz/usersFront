import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [CommonModule, UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  title: String = 'Sistema de Gestión de Usuarios';

  users: User[] = [];

  userSelected: User;

  constructor(private service: UserService){
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => this.users = data);
  }

  addUser(user: User): void {
    if (user.id > 0){
      this.users = this.users.map(u => (u.id === user.id) ? {...user} : u );
    } else {
      this.users = [...this.users, {...user}];
    }
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado con éxito",
      icon: "success"
    });
    this.userSelected = new User();
  }

  removeUser(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar el usuario?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id !== id);
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  setSelectedUser(user: User): void {
    this.userSelected = {...user};
  }

}
