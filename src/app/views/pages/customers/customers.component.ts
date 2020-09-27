import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { Customers } from './customerBaseClass';
import { CustomersService } from './customers.service';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { of as observableOf } from 'rxjs';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'kt-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  loading$: boolean;
  ELEMENT_DATA: Customers[];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  selected: string;
  searchText: string;
  constructor(private layoutUtilsService: LayoutUtilsService,
    private _http: CustomersService,
    public dialog: MatDialog, private router: Router,
    private changeDetection: ChangeDetectorRef) {
    this.ELEMENT_DATA = [];
    this.selected = '';
    this.searchText = '';
  }
  CustomerPredicate: string[] = ['id',
    'companyName',
    'contactName',
    'contactTitle',
    'address',
    'city',
    'postalCode',
    'country',
    'phone',
    'fax'];
  displayedColumns: string[] = ['id',
    'companyName',
    'contactName',
    'contactTitle',
    'address',
    'city',
    'postalCode',
    'country',
    'phone',
    'fax',
    'view'];




  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.initLoad();
  }
  initLoad() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const temp = this._http.getCustomers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
          return temp;
        }),
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
    this._http.viewOrder(element).subscribe((d: any) => {


      const dialogRef = this.dialog.open(ModalComponent, { data: d });

      dialogRef.afterClosed().subscribe(data => {
        console.log(data);

      });
      console.log(d);
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

    else {
      this.initLoad();
    }
  }
}
