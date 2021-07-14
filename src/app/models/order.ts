import {ItemsTotal} from './cartItem'

export interface Order extends ItemsTotal{
  fullname:string;
  email:string;
  cc:number;
  adresse:string;
}
