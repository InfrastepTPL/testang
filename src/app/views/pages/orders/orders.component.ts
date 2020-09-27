import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Observable } from 'rxjs';
import {ModalOComponent} from './modal/modal.component';

import { of as observableOf } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from './orders.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'kt-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  order = new FormControl();
  loading$: boolean;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  selected: string;
  searchText: string;
  constructor(private layoutUtilsService: LayoutUtilsService,
    private _http: OrdersService,
    public dialog: MatDialog, private router: Router,
    private changeDetection: ChangeDetectorRef) {
    this.ELEMENT_DATA = [];
    this.selected = '';
    this.searchText = '';
  }
  OrderPredicate: string[] = ['id',
    'customerId',
    'employeeId',
    'freight',
    'orderDate',
    'requiredDate',
    'shipAddress',
    'shipCity',
    'shipCountry',
    'shipName',
    'shipPostalCode',
    'shipVia',
    'shippedDate',    
    'displayedColumns'
  ];
  displayedColumns: string[] = ['id',
    'customerId',
    'employeeId',
    'freight',
    'orderDate',
    'requiredDate',
    'shipAddress',
    'shipCity',
    'shipCountry',
    'shipName',
    'shipPostalCode',
    'shipVia',
    'shippedDate',
    'displayedColumns',
    'view'
  ];




  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {

    this.initLoad();

  }
  initLoad() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const temp = this._http.getOrders(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        
            return temp;
        }
        
        ),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;

          console.log(data);
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.dataSource.data = data.results;
        console.log(this.dataSource.data);
      });
  }
  viewOrder(element) {
   
console.log(element);

       const dialogRef = this.dialog.open(ModalOComponent, { data: element });

       dialogRef.afterClosed().subscribe(data => {
         console.log(data);

       });
     
   
  }

  searchResult() {
    if (this.selected !== '' && this.searchText !== '') {
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this._http.searchResult(this.selected, this.searchText);
          }),
          map((data: any) => {
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total;

            console.log(data);
            return data;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => {
          this.dataSource.data = data.results;
          console.log(this.dataSource.data);
        });
    }
    else {
      this.initLoad();
    }
  }
}
