import {
    IonButton,
    IonCheckbox,
    IonItem,
    IonInput,
    IonList
} from "@ionic/react";
import BasePage from "./../BasePage";

import { validateText, validateNumber } from "./../common/validate";
import { useHistory } from "react-router-dom";

import { EMPTY_BURGER } from "..//common/consts";

const CreateUpdate: React.FC<{
    action: string;
    burgerValues: any;
    addBurger: Function;
    loadingAddBurger: boolean;
    errorAddBurger: any;
    editBurger: Function;
    loadingEditBurger: boolean;
    errorEditBurger: any;
    setBurgerValues: Function;
    isBurgerValid: any;
    setIsBurgerValid: Function;
    isBurgerTouched: any;
    setIsBurgerTouched: Function;
    getBurgers: Function;
}> = (props) => {
    const title = props.action == "create" ? "Create Burger" : "Edit Burger";
    const status = props.action == "create" ? "Creating..." : "Editing...";
    const labelAction = props.action == "create" ? "Create" : "Edit";

    const history = useHistory();

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
            data = await props.addBurger({ variables: props.burgerValues });
        } else {
            data = await props.editBurger({ variables: props.burgerValues });
        }
        if (data.data?.createProduct?._id || data.data?.updateProduct?._id) {
            props.setBurgerValues(EMPTY_BURGER);
            props.getBurgers();
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

    const validateInput = (ev: any) => {
        const { name, value, checked, type } = ev.target;
        let validInput: any;
        if (type == "text") {
            validInput = validateText(value);
        } else if (type == "number") {
            validInput = validateNumber(value);
        }
        props.setIsBurgerValid((previousValues: any) => ({
            ...previousValues,
            [name]: validInput
        }));
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
            {props.errorAddBurger ? (
                <pre>{props.errorAddBurger.message}</pre>
            ) : (
                ""
            )}
            {props.errorEditBurger ? (
                <pre>{props.errorEditBurger.message}</pre>
            ) : (
                ""
            )}
            {props.loadingAddBurger || props.loadingEditBurger ? (
                <p>{status}</p>
            ) : (
                <form>
                    <IonList>
                        <IonItem>
                            <IonInput
                                value={props.burgerValues.title}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="title"
                                label="Title:"
                                className={`${
                                    props.isBurgerTouched.title && "ion-valid"
                                } ${
                                    props.isBurgerValid.title === false &&
                                    "ion-invalid"
                                } ${
                                    props.isBurgerTouched.title && "ion-touched"
                                }`}
                                errorText="Invalid Title"
                                onIonBlur={() =>
                                    props.setIsBurgerTouched(
                                        (previousValues: any) => ({
                                            ...previousValues,
                                            ["title"]: true
                                        })
                                    )
                                }
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput
                                value={props.burgerValues.description}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="description"
                                label="Description:"
                                className={`${
                                    props.isBurgerValid.description &&
                                    "ion-valid"
                                } ${
                                    props.isBurgerValid.description === false &&
                                    "ion-invalid"
                                } ${
                                    props.isBurgerTouched.title && "ion-touched"
                                }`}
                                errorText="Invalid Description"
                                onIonBlur={() =>
                                    props.setIsBurgerTouched(
                                        (previousValues: any) => ({
                                            ...previousValues,
                                            ["description"]: true
                                        })
                                    )
                                }
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                value={props.burgerValues.price}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="price"
                                label="Price:"
                                type="number"
                                className={`${
                                    props.isBurgerValid.price && "ion-valid"
                                } ${
                                    props.isBurgerValid.price === false &&
                                    "ion-invalid"
                                } ${
                                    props.isBurgerTouched.title && "ion-touched"
                                }`}
                                errorText="Invalid Price"
                                onIonBlur={() =>
                                    props.setIsBurgerTouched(
                                        (previousValues: any) => ({
                                            ...previousValues,
                                            ["pricce"]: true
                                        })
                                    )
                                }
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
                        disabled={
                            !props.isBurgerValid.title ||
                            !props.isBurgerValid.description ||
                            !props.isBurgerValid.price
                        }
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
