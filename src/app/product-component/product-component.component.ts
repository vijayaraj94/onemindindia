import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { MatDialog, ThemePalette, ProgressSpinnerMode, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit, OnDestroy  {
  private ngUnsubscribe = new Subject();
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  showLoading:boolean = false;
  productArray = {
    productName: "",
    availableQuantity: 1
  };
  orderArray = {
      "orderId": "",
      "customerId": "",
      "productId": "",
      "quantity": 0
  };
  currentOrderProduct = {
    productId: '',
    productName: ''
  };
  @ViewChild('productModal') productModal: TemplateRef<any>;
  @ViewChild('orderProductModal') orderProductModal: TemplateRef<any>;
  productList = [];
  orderQuantity: number;
  
  constructor(
    public dialog: MatDialog, 
    private http: HttpClient, 
    private services: AppService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProductGrid();
  }

  getProductGrid() {
    this.services.getProductDetails().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      this.productList = result || [];
    });
  }
  addNewProduct() {
    this.dialog.open(this.productModal, {
      disableClose: true,
        height: 'auto',
        width: '35%',
        autoFocus: false
    });
  }
  onSubmit() {
    this.dialog.closeAll();
    this.showLoading = true;
    this.productArray.availableQuantity =+ this.productArray.availableQuantity;
    this.services.saveProductDetail(this.productArray).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.showLoading = false;
      this.openSnackBar('Product added successfully');
      if(data == true) {
        this.getProductGrid();
        this.productArray = {
          productName: "",
          availableQuantity: 1
        };
      }
    });
  }
  orderProduct(item) {
    this.currentOrderProduct.productId = item.productId;
    this.currentOrderProduct.productName = item.productName;
    this.dialog.open(this.orderProductModal, {
      disableClose: true,
        height: 'auto',
        width: '35%',
        autoFocus: false
    });
  }
 
  submitOrder() {
    this.dialog.closeAll();
    this.showLoading = true;
    if(this.orderQuantity > 0) {
      let currentOrder = {
        orderId: this.currentOrderProduct.productId,
        customerId: this.currentOrderProduct.productId,
        productId: this.currentOrderProduct.productId,
        uantity: this.orderQuantity
      };
      console.log(currentOrder, 'currentOrder');
      this.services.saveOrderDetail(currentOrder).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        this.showLoading = false;
        if(data == true) {
          this.openSnackBar('Your order successfully placed');
          this.getProductGrid();
          this.productArray = {
            productName: "",
            availableQuantity: 0
          };
        }
      });
    } else {
      this.openSnackBar('You ordered 0 Quantity, Please make atleast one quantity for your order');
    }
  }
  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
