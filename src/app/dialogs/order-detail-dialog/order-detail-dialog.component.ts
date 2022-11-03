import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { OrderService } from 'src/app/services/common/models/order.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | number,
    private orderService: OrderService) {
    super(dialogRef)
  }

  singleOrder: Single_Order
  displayedColumns: string[] = ['name', 'quantity', 'price', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  orderTotalPrice: number


  async ngOnInit() {
    this.singleOrder = await this.orderService.getOrderById(this.data);
    this.dataSource = this.singleOrder.basketItems;
    this.orderTotalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

}

export enum OrderDetailDialogState {
  Close,
  Completed
}


