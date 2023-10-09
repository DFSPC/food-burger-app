import {
    IonButton,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList
} from "@ionic/react";
import "./Home.css";

import React, { useState } from "react";

import { useMutation, gql } from "@apollo/client";

import { useHistory } from "react-router-dom";

const CreateUpdate: React.FC<{
    action: string;
    reloadData: any;
    productValues: any;
    setProductValues: Function;
}> = (props) => {
    const title = props.action == "create" ? "Create Burger" : "Edit Burger";
    const status = props.action == "create" ? "Creating..." : "Editing...";
    const labelAction = props.action == "create" ? "Create" : "Edit";

    const CREATE_BURGERS_QUERY = gql`
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

    const UPDATE_BURGER_QUERY = gql`
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

    const emptyProduct = {
        _id: "",
        title: "",
        description: "",
        price: "",
        featured: false,
        img_url: "",
        img_blob: ""
    };

    const history = useHistory();

    const [addBurger, { data: dataAdd, loading: loadingAdd, error: errorAdd }] =
        useMutation(CREATE_BURGERS_QUERY);

    const [
        editBurger,
        { data: dataEdit, loading: loadingEdit, error: errorEdit }
    ] = useMutation(UPDATE_BURGER_QUERY);

    const convertBase64 = async (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve((fileReader.result as string).split(",").pop());
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const createUpdateBurger = async (ev: any) => {
        let data: any;
        if (props.action == "create") {
            data = await addBurger({ variables: props.productValues });
        } else {
            data = await editBurger({ variables: props.productValues });
        }
        if (data.data?.createProduct?._id || data.data?.updateProduct?._id) {
            props.setProductValues(emptyProduct);
            props.reloadData();
            history.push("/home");
        }
    };

    const onFileChange = async (ev: any) => {
        const file = ev.target.files[0];
        const base64 = await convertBase64(file);
        props.setProductValues({
            ...props.productValues,
            ["img_blob"]: base64 as string
        });
    };

    const handleInputChange = (ev: any) => {
        const { name, value, checked } = ev.target;
        let sendValue: any;
        if (checked == true) {
            sendValue = checked;
        } else if (checked == false) {
            sendValue = checked;
        } else if (isNaN(value)) {
            sendValue = value;
        } else {
            sendValue = parseFloat(value);
        }
        props.setProductValues((previousValues: any) => ({
            ...previousValues,
            [name]: sendValue
        }));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {errorAdd ? <pre>{errorAdd.message}</pre> : ""}
                {errorEdit ? <pre>{errorEdit.message}</pre> : ""}
                {loadingAdd || loadingEdit ? (
                    <p>{status}</p>
                ) : (
                    <form>
                        <IonList>
                            <IonItem>
                                <IonInput
                                    value={props.productValues.title}
                                    onIonInput={handleInputChange}
                                    name="title"
                                    label="Title:"
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    value={props.productValues.description}
                                    onIonInput={handleInputChange}
                                    name="description"
                                    label="Description:"
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    value={props.productValues.price}
                                    onIonInput={handleInputChange}
                                    name="price"
                                    label="Price:"
                                    type="number"
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonCheckbox
                                    onIonChange={handleInputChange}
                                    name="featured"
                                    checked={props.productValues.featured}
                                >
                                    Featured?
                                </IonCheckbox>
                            </IonItem>

                            <IonItem>
                                <input
                                    name="image"
                                    type="file"
                                    onChange={(ev) => onFileChange(ev)}
                                ></input>
                            </IonItem>
                        </IonList>

                        <IonButton
                            type="button"
                            color="primary"
                            expand="full"
                            onClick={(ev) => createUpdateBurger(ev)}
                        >
                            {labelAction}
                        </IonButton>
                    </form>
                )}
            </IonContent>
        </IonPage>
    );
};

export default CreateUpdate;
