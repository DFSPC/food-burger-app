export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  featured: boolean;
  img_url: string;
  img_blob: string;
}

export interface User {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  cellphone: number | string;
  rol: string;
  token: string;
}

export interface ValidationState {
  [key: string]: boolean;
}

export interface ProductValidation {
  title: boolean;
  description: boolean;
  price: boolean;
}

export interface UserValidation extends Record<string, boolean> {
  fullname: boolean;
  email: boolean;
  password: boolean;
  cellphone: boolean;
}
