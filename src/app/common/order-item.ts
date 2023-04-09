import { CartItem } from "./cart-item";

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  productId: string;
  quantity: number;

  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.productId = cartItem.id;
    this.quantity = cartItem.quantity;
  }
}
