import { Product } from './../products/product.model';
import { User } from './../users/users.model';

export interface Order {
  id: string | number;
  createdAt: Date;
  products: Product[];
  user: User;
}
