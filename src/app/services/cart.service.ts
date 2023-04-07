import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  /**
   * Subject is a subclass of observable
   * We can use subjects to publish events in our code
   * The event will be sent to all the subscribers
   */

  totalPriceEvent: Subject<number> = new Subject<number>();

  totalQuantityEvent: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {

    /**
     * Logic behind all this checking:
     * If the item already exists in the cart, then we just increment its qty in the cartItems[],
     * else we push a new item to the cartItems[]
     */

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in cart based on id

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    // Compute cart totalPrice and totalQuantity
    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += (cartItem.unitPrice * cartItem.quantity);
      totalQuantityValue += (cartItem.quantity);
    }

    // Publish/send the events
    this.totalPriceEvent.next(totalPriceValue);
    this.totalQuantityEvent.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');

    for (let cartItem of this.cartItems) {
      const subTotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(`name=${cartItem.name}, unitPrice=${cartItem.unitPrice}, quantity=${cartItem.quantity}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('---');

  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {

    // get index of item in the array
    const itemIdx = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    // if found, remove the item from the array at the given index
    if (itemIdx > -1) {
      this.cartItems.splice(itemIdx, 1);
      this.computeCartTotals();
    }

  }



}
