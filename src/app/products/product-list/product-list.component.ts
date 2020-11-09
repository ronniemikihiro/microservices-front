import { PageProduct } from './../../core/entities/pages/page-product';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { Product } from 'src/app/core/entities/product';
import { MessageService } from 'src/app/core/services/message.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageProduct: PageProduct = new PageProduct();
  colunas = ['id', 'name', 'actions'];

  constructor(private logger: NGXLogger,
              private titleService: Title,
              private messageService: MessageService,
              private productService: ProductService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleService.setTitle('Products List');
    this.logger.log('Products List loaded');
    this.consultListProducts(0, 5);
  }

  consultListProducts(page, size) {
    this.productService.list(page, size).subscribe(response => {
      this.pageProduct.content = response.content;
      this.pageProduct.totalElements = response.totalElements;
    }, errorResponse => {
      console.log(errorResponse);
    });
  }

  paginator(event: PageEvent) {
    this.consultListProducts(event.pageIndex, event.pageSize)
  }

  confirmDialogDelete(product : Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel("Confirm", 'Delete this item?'),
      maxWidth: "400px"
    });

    dialogRef.afterClosed().subscribe(dialogConfirm => {
      if(dialogConfirm) {
        this.productService.delete(product.id).subscribe(response => {
          this.messageService.success('Register deleted successfully!');
          this.consultListProducts(0, 5);
        }, errorResponse => {
          this.messageService.error(errorResponse.error.message);
        });
      }
    });
  }

}

