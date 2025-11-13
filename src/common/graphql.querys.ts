import { gql } from "@apollo/client";

export const GET_PRODUCTS_QUERY = gql`
    query Products {
        products {
            _id
            title
            description
            img_url
            price
            featured
        }
    }
`;

export const CREATE_PRODUCT_QUERY = gql`
    mutation CreateProduct(
        $title: String!
        $img_blob: String
        $img_url: String
        $price: Float!
        $featured: Boolean!
        $description: String!
    ) {
        createProduct(
            title: $title
            img_blob: $img_blob
            img_url: $img_url
            price: $price
            featured: $featured
            description: $description
        ) {
            _id
            description
            featured
            img_blob
            img_url
            price
            title
        }
    }
`;

export const UPDATE_PRODUCT_QUERY = gql`
    mutation UpdateProduct(
        $_id: ID!
        $title: String!
        $description: String!
        $price: Float!
        $featured: Boolean!
        $img_blob: String
        $img_url: String
    ) {
        updateProduct(
            _id: $_id
            title: $title
            description: $description
            price: $price
            featured: $featured
            img_blob: $img_blob
            img_url: $img_url
        ) {
            _id
            title
            description
            img_blob
            img_url
            price
            featured
        }
    }
`;

export const DELETE_PRODUCT_QUERY = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(_id: $id)
    }
`;

export const LOGIN_USER_QUERY = gql`
    query GetUserByEmailPassword($email: String!, $password: String!) {
        getUserByEmailPassword(email: $email, password: $password) {
            _id
            fullname
            password
            cellphone
            email
            rol
            token
        }
    }
`;

export const CREATE_USER_QUERY = gql`
    mutation CreateUser(
        $fullname: String!
        $password: String!
        $cellphone: Float!
        $email: String!
    ) {
        createUser(
            fullname: $fullname
            password: $password
            cellphone: $cellphone
            email: $email
        ) {
            _id
            fullname
            password
            cellphone
            email
            rol
            token
        }
    }
`;
