import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  disableSubmit: boolean;

  constructor(private authService: AuthService,
    private logger: NGXLogger,
    private loadingService: LoadingService,
    private messageService: MessageService) {

    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
  }

  ngOnInit() {
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirm: new FormControl('', Validators.required),
    });

    this.form.get('currentPassword').valueChanges
      .subscribe(val => { this.currentPassword = val; });

    this.form.get('newPassword').valueChanges
      .subscribe(val => { this.newPassword = val; });

    this.form.get('newPasswordConfirm').valueChanges
      .subscribe(val => { this.newPasswordConfirm = val; });

    this.loadingService.visibility.subscribe((value) => {
      this.disableSubmit = value;
    });
  }

  changePassword() {

    if (this.newPassword !== this.newPasswordConfirm) {
      this.messageService.success('New passwords do not match.');
      return;
    }

    const email = this.authService.getNameUserAuthenticated();

    /*this.authService.changePassword(email, this.currentPassword, this.newPassword)
      .subscribe(
        data => {
          this.logger.info(`User ${email} changed password.`);
          this.form.reset();
          this.notificationService.success('Your password has been changed.');
        },
        error => {
          this.notificationService.error(error.error);
        }
      );*/
  }
}
