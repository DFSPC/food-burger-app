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
    const labelAction = props.action == "create" ? "Create" : "Edit";

    const CREATE_BURGERS_QUERY = gql`
        mutation CreateProduct(
            $title: String!
            $imgUrl: String!
            $price: Float!
            $featured: Boolean!
            $description: String!
        ) {
            createProduct(
                title: $title
                img_url: $imgUrl
                price: $price
                featured: $featured
                description: $description
            ) {
                _id
                description
                featured
                img_url
                price
                title
            }
        }
    `;

    const emptyProduct = {
        title: "",
        description: "",
        price: "",
        featured: false,
        imgUrl: ""
    };

    const history = useHistory();

    const [addBurger, { data, loading, error }] =
        useMutation(CREATE_BURGERS_QUERY);

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

    const createBurger = async (ev: any) => {
        const data = await addBurger({ variables: props.productValues });
        if (data.data?.createProduct?._id) {
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
            ["imgUrl"]: base64 as string
        });
    };

    const handleInputChange = (ev: any) => {
        const { name, value, checked } = ev.target;
        console.log("checked", checked);
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

    console.log("props.productValues", props.productValues);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {error ? <pre>{error.message}</pre> : ""}
                {loading ? (
                    <p>Creating...</p>
                ) : (
                    <form>
                        <IonList>
                            <IonItem>
                                <IonInput
                                    value={props.productValues.title}
                                    onIonChange={handleInputChange}
                                    name="title"
                                    label="Title:"
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    value={props.productValues.description}
                                    onIonChange={handleInputChange}
                                    name="description"
                                    label="Description:"
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    value={props.productValues.price}
                                    onIonChange={handleInputChange}
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
                            onClick={(ev) => createBurger(ev)}
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
