import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from './customerBaseClass';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  loading: boolean;
  constructor(private http: HttpClient) {
    this.loading = false;
  }

  getCustomers(sort: string, order: string, pageNo:any, pageSize: any): Observable<any> {
   if(pageSize === undefined){
    pageSize = 5;
   }

    pageNo = pageNo * pageSize;

    let prms = new HttpParams();
    prms = prms.append('Skip', pageNo);
    prms = prms.append('Take', pageSize);
    prms = prms.append('include', 'Total');
    const dt = this.http.get<any>(`http://northwind.netcore.io/json/reply/QueryCustomers`,{ params: prms });
    return dt;

  }

  viewOrder(element: Customers): Observable<any> {
    return this.http.get<any>(`http://northwind.netcore.io/customers/${element.id}`);
  }

  searchResult(fieldName: string, fieldValue: string): Observable<any> {

    const url = `http://northwind.netcore.io/json/reply/QueryCustomers?${fieldName}Contains=${fieldValue}&include=Total`
    return this.http.get<any>(url);
  }
}
