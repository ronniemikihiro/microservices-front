import { PageUser } from './../../core/entities/pages/page-user';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NGXLogger } from 'ngx-logger';
import { User } from 'src/app/core/entities/user';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/core/services/message.service';
import { AbstractComponent } from 'src/app/shared/abstract-component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends AbstractComponent implements OnInit {

  pageUser: PageUser = new PageUser();
  colunas = ['id', 'name', 'email', 'actions']

  constructor(private logger: NGXLogger,
              private titleService: Title,
              private messageService: MessageService,
              private userService: UserService,
              public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('User List');
    this.logger.log('Users List loaded');
    this.consultListUsers(0, 5);
  }

  consultListUsers(page, size) {
    this.userService.list(page, size).subscribe(response => {
      this.pageUser.content = response.content;
      this.pageUser.totalElements = response.totalElements;
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

  paginator(event: PageEvent) {
    this.consultListUsers(event.pageIndex, event.pageSize);
  }

  confirmDialogDelete(user : User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel("Confirm", 'Delete this item?'),
      maxWidth: "400px"
    });

    dialogRef.afterClosed().subscribe(dialogConfirm => {
      if(dialogConfirm) {
        this.userService.delete(user.id).subscribe(response => {
          this.messageService.success('Register deleted successfully!');
          this.consultListUsers(0, 5);
        }, errorResponse => {
          this.messageService.error(errorResponse.error.message);
        });
      }
    });
  }
}
