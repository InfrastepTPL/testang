import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CustomerOrders, Order, OrderDetails} from '../../customers/customerBaseClass';
import { OrdersComponent } from '../orders.component';

@Component({
  selector: 'kt-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalOComponent implements OnInit {
  panelOpenState = false;
  modalData: any;
  customerOrders: CustomerOrders[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrdersComponent>) {
      console.log(data);
         this.customerOrders=data; 
  }

  ngOnInit(): void {
  }

}
