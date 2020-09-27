import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerOrders, Customers, Order, OrderDetails} from '../customerBaseClass';
import { CustomersComponent } from '../customers.component';

@Component({
  selector: 'kt-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  panelOpenState = false;
  modalData: any;
  customer: Customers;
  customerOrders: CustomerOrders[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomersComponent>) {

    this.customerOrders = [];
    this.modalData = data;
    this.customer = data.customer;
    this.customerOrders = data.customerOrders;
  }

  ngOnInit(): void {
  }

}
