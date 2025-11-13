export const EMPTY_PRODUCT = {
    _id: "",
    title: "",
    description: "",
    price: "" as number | string,
    featured: false,
    img_url: "",
    img_blob: ""
};

export const EMPTY_VALID_PRODUCT = {
    title: false,
    description: false,
    price: false
};

export const FULL_VALID_PRODUCT = {
    title: true,
    description: true,
    price: true
};

export const EMPTY_USER = {
    _id: "",
    fullname: "",
    email: "",
    password: "",
    cellphone: "" as number | string,
    rol: "",
    token: ""
};

export const EMPTY_VALID_USER = {
    fullname: false,
    email: false,
    password: false,
    cellphone: false
};
