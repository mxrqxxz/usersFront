import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  title: String = 'Sistema de Gestión de Usuarios';

  users: User[] = [];

  constructor(private service: UserService, private sharingData: SharingDataService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => this.users = data);
    this.addUser();
    this.removeUser();
  }

  addUser(): void {
    this.sharingData.newUserEventEmitter.subscribe(user => {
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
    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
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
    });
  }
  
}
