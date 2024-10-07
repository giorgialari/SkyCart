export interface Card {
  id: number,
  product_id: number,
  username: string,
  name: string,
  title: string,
  category: string,
  price: string,
  rating: string,
  quantity: number
}

export interface Product {
  id: number;
  title: string;
  category: string;
  rating: string;
  price: string;
  imageUrl: string;
}
