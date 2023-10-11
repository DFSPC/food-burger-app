import {
    IonButton,
    IonCheckbox,
    IonItem,
    IonInput,
    IonList
} from "@ionic/react";

import React from "react";
import BasePage from "./../BasePage";

import { useMutation } from "@apollo/client";
import { CREATE_BURGERS_QUERY, UPDATE_BURGER_QUERY } from "./../GraphQL";

import { useHistory } from "react-router-dom";

const CreateUpdate: React.FC<{
    action: string;
    burgerValues: any;
    setBurgerValues: Function;
}> = (props) => {
    const title = props.action == "create" ? "Create Burger" : "Edit Burger";
    const status = props.action == "create" ? "Creating..." : "Editing...";
    const labelAction = props.action == "create" ? "Create" : "Edit";

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
            data = await addBurger({ variables: props.burgerValues });
        } else {
            data = await editBurger({ variables: props.burgerValues });
        }
        if (data.data?.createProduct?._id || data.data?.updateProduct?._id) {
            props.setBurgerValues(emptyProduct);
            history.push("/home");
        }
    };

    const onFileChange = async (ev: any) => {
        const file = ev.target.files[0];
        const base64 = await convertBase64(file);
        props.setBurgerValues({
            ...props.burgerValues,
            ["img_blob"]: base64 as string
        });
    };

    const handleInputChange = (ev: any) => {
        const { name, value, checked, type } = ev.target;
        let sendValue: any;
        if (checked == true) {
            sendValue = checked;
        } else if (checked == false) {
            sendValue = checked;
        } else if (type == "number") {
            sendValue = parseFloat(value);
        } else {
            sendValue = value;
        }
        props.setBurgerValues((previousValues: any) => ({
            ...previousValues,
            [name]: sendValue
        }));
    };

    return (
        <BasePage title={title} footer="">
            {errorAdd ? <pre>{errorAdd.message}</pre> : ""}
            {errorEdit ? <pre>{errorEdit.message}</pre> : ""}
            {loadingAdd || loadingEdit ? (
                <p>{status}</p>
            ) : (
                <form>
                    <IonList>
                        <IonItem>
                            <IonInput
                                value={props.burgerValues.title}
                                onIonInput={handleInputChange}
                                name="title"
                                label="Title:"
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput
                                value={props.burgerValues.description}
                                onIonInput={handleInputChange}
                                name="description"
                                label="Description:"
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                value={props.burgerValues.price}
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
                                checked={props.burgerValues.featured}
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
        </BasePage>
    );
};

export default CreateUpdate;
