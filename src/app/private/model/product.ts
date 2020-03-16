import { Customer } from './customer';

export class Product {
  id: number;
  description: string;
  code: string;
  price: number;
  customer: Customer;
  yearFrom: number;
  yearTo: number;
  bridge: boolean;
  amount: number;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }
}
