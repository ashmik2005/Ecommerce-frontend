import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPriceValue: number = 0;
  totalQuantityValue: number = 0;

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPriceEvent
    this.cartService.totalPriceEvent.subscribe(
      data => {
        this.totalPriceValue = data;
      }
    );

    // subscribe to the cart totalQuantityEvent
    this.cartService.totalQuantityEvent.subscribe(
      data => {
        this.totalQuantityValue = data;
      }
    );

    // compute cart total and quantity
    this.cartService.computeCartTotals();


  }

}
