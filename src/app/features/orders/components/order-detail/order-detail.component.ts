import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrdersService } from '../../services/orders.service';
import { Order, OrderItem } from '../../../../shared/models/order.model';

type OrderLineItem = Pick<OrderItem, 'productName' | 'quantity' | 'price'>;

type OrderDetailView = Omit<Order, 'items'> & {
  lineItems: OrderLineItem[];
};

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order$!: Observable<OrderDetailView>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.order$ = this.route.paramMap.pipe(
      switchMap((params) => this.ordersService.getOrder(params.get('id')!)),
      map((order) => ({
        ...order,
        lineItems: order.items.map(({ productName, quantity, price }): OrderLineItem => ({
          productName,
          quantity,
          price
        }))
      }))
    );
  }
}
