import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/core/entities/role';
import { User } from 'src/app/core/entities/user';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'src/app/core/services/message.service';
import { AbstractComponent } from 'src/app/core/abstract-component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends AbstractComponent implements OnInit {

  form: FormGroup;
  listRoles: Role[] = [];

  constructor(private logger: NGXLogger,
              private titleService: Title,
              private userService: UserService,
              private roleService: RoleService, 
              private messageService: MessageService,
              private router: Router,
              private activatedRoute : ActivatedRoute) { 
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('User Form');
    this.logger.log('Users Form loaded');
    this.consultListRoles();
    this.loadUser();
  }

  private createForm(user : User) {
    this.form = new FormGroup({
      id: new FormControl(user ? user.id : ''),
      name: new FormControl(user ? user.name : '', [Validators.required]),
      email: new FormControl(user ? user.email : '', [Validators.required, Validators.email]),
      password: new FormControl(user ? user.password : '', [Validators.required]),
      roles: new FormControl(user ? user.roles : '', [Validators.required])
    });
  }

  consultListRoles() {
    this.roleService.listAll().subscribe(response => {
      this.listRoles = response;
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

  saveUser() {
    try {
      this.validPropertiesForm(this.form);
      const user: User = this.formToObj(this.form, new User());

      this.userService.save(user).subscribe(response => {
        this.messageService.success(!user.id ? 'User System successfully registered!' : 'User System edited successfully!');
        this.router.navigate(['/users']);
      }, errorResponse => {
        this.messageService.error(errorResponse.error.message);
      })
    } catch (e) {
      this.messageService.notify(e);
    }
  }

  loadUser() {
    let params : Observable<Params> = this.activatedRoute.params;

    params.subscribe(urlParams => {
      const id = urlParams['id'];
      if(id) {
        this.userService.findById(id).subscribe(response => {
          this.createForm(response);
        }, errorResponse => {
          this.messageService.error(errorResponse.error.message);
        })
      }
    });

    this.createForm(undefined);
  }

}
