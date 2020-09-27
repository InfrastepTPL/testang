
export class Customers {
    id: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
}

export class CustomerOrders {

    constructor(){
        this.order=new Order();
        this.orderDetails = [];
    }
    order:Order;
    orderDetails:OrderDetails[]
}

export class Order{
customerId: string;
employeeId: number;
freight: number;
id: number;
orderDate: Date;
requiredDate: Date;
shipAddress: string;
shipCity: string
shipCountry: string
shipName: string;
shipPostalCode: string;
shipVia: string;
shippedDate:Date;
}

export class OrderDetails{
    discount: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
}