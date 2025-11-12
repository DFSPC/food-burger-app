export interface Burger {
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

export interface BurgerValidation {
    title: boolean;
    description: boolean;
    price: boolean;
}

export interface UserValidation {
    fullname: boolean;
    email: boolean;
    password: boolean;
    cellphone: boolean;
}
