import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/entities/product';
import { MessageService } from 'src/app/core/services/message.service';
import { ProductService } from 'src/app/core/services/product.service';
import { AbstractComponent } from 'src/app/core/abstract-component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends AbstractComponent implements OnInit {

  form: FormGroup;

  constructor(private logger: NGXLogger,
              private titleService: Title,
              private productService: ProductService,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute : ActivatedRoute) { 
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Products Form');
    this.logger.log('Products Form loaded');
    this.loadProduct();
  }

  private createForm(product : Product) {
    this.form = new FormGroup({
      id: new FormControl(product ? product.id : ''),
      name: new FormControl(product ? product.name : '', [Validators.required])
    });
  }

  saveProduct() {
    try {
      this.validPropertiesForm(this.form);
      const product = this.formToObj(this.form, new Product());

      this.productService.save(product).subscribe(response => {
        this.messageService.success(!product.id ? 'Product successfully registered!' : 'Product edited successfully!');
        this.router.navigate(['/products']);
      }, errorResponse => {
        this.messageService.error(errorResponse.error.message);
      })
    } catch (e) {
      this.messageService.notify(e);
    }
  }

  loadProduct() {
    let params : Observable<Params> = this.activatedRoute.params;

    params.subscribe(urlParams => {
      const id = urlParams['id'];
      if(id) {
        this.productService.findById(id).subscribe(response => {
          this.createForm(response);
        }, errorResponse => {
          this.messageService.error(errorResponse.error.message);
        })
      }
    });

    this.createForm(undefined);
  }
}
