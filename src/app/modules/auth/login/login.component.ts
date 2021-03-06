import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/delay';

import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { AbstractComponent } from 'src/app/core/abstract-component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponent implements OnInit {

    mobileQuery: MediaQueryList
    form: FormGroup;
    loading: boolean;
    hidePassword: boolean = true;

    constructor(private router: Router,
                private messageService: MessageService,
                private authService: AuthService,
                private media: MediaMatcher) {
        super();                
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = this.authService.getUserEmail();

        this.form = new FormGroup({
            email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(savedUserEmail !== null)
        });
    }

    login() {
        try {
            this.loading = true;

            this.validPropertiesForm(this.form);

            const email = this.form.get('email').value;
            const password = this.form.get('password').value;
            const rememberMe = this.form.get('rememberMe').value;

            this.authService.login(email, password).subscribe(response => {
                this.authService.saveToken(response);
                if(rememberMe) {
                    this.authService.saveUserEmail(email);
                } else {
                    this.authService.deleteUserEmail();
                }
                this.messageService.success('Login successfully!');
                this.router.navigate(['/']);
            }, errorResponse => {
                this.loading = false;
            });
        } catch (e) {
            this.messageService.notify(e);
            this.loading = false;
        }
    }
}
