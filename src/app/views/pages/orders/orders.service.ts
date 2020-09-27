import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  loading: boolean;
  constructor(private http: HttpClient) {
    this.loading = false;
  }

  /*getCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`http://northwind.netcore.io/customers.json`);
  }*/
  getOrders(sort: string, order: string, pageNo:any, pageSize: any): Observable<any> {
   if(pageSize === undefined){
    pageSize = 5;
   }

   pageNo = pageNo * pageSize;

    let prms = new HttpParams();
    prms = prms.append('Skip', pageNo);
    prms = prms.append('Take', pageSize);
    prms = prms.append('include', 'Total');
    return this.http.get<any>(`http://northwind.netcore.io/json/reply/QueryOrders`,{ params: prms });

  }



  viewOrder(element: any): Observable<any> {
    return this.http.get<any>(`http://northwind.netcore.io/customers/${element.id}`);
  }

  searchResult(fieldName: string, fieldValue: string): Observable<any> {
    const url = `http://northwind.netcore.io/json/reply/QueryOrders?${fieldName}Contains=${fieldValue}&include=Total`
    return this.http.get<any>(url);
  }
}
