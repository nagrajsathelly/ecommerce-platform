export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}
export interface Order {
  id: string;
  items: {
    productId: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  address: ShippingAddress;
  paymentMethod: "cod" | "demo";
  subtotal: number;
  shipping: number;
  total: number;
  status: "placed";
  createdAt: string;
}