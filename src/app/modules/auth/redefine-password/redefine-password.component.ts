import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/abstract-component';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.component.html',
  styleUrls: ['./redefine-password.component.css']
})
export class RedefinePasswordComponent extends AbstractComponent implements OnInit {

  mobileQuery: MediaQueryList
  form: FormGroup;
  showInfoSubmitEmail: boolean = false;

  constructor(private media: MediaMatcher,
              private messageService: MessageService) {
    super();
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  submitEmail() {
    try {
      this.validPropertiesForm(this.form);
      this.showInfoSubmitEmail = true;
    } catch (e) {
      this.messageService.notify(e);
    }
  }
  
}
