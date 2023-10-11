import { IonButton, IonItem, IonInput, IonList } from "@ionic/react";
import BasePage from "./../BasePage";
import { useMutation } from "@apollo/client";
import { CREATE_USER_QUERY } from "../common/graphql.querys";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import {
    validateEmail,
    validatePassword,
    validateText,
    validateNumber
} from "./../common/validate";

const Register: React.FC<{
    userValues: any;
    setUserValues: Function;
}> = (props) => {
    const history = useHistory();

    const emptyForm = {
        fullname: false,
        email: false,
        password: false,
        cellphone: false
    };

    const [isTouched, setIsTouched] = useState(emptyForm);
    const [isValid, setIsValid] = useState(emptyForm);

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
        props.setUserValues((previousValues: any) => ({
            ...previousValues,
            [name]: sendValue
        }));
    };

    const validateInput = (ev: any) => {
        const { name, value, checked, type } = ev.target;
        let validInput: any;
        if (type == "email") {
            validInput = validateEmail(value);
        } else if (type == "password") {
            validInput = validatePassword(value);
        } else if (type == "text") {
            validInput = validateText(value);
        } else if (type == "number") {
            validInput = validateNumber(value);
        }
        setIsValid((previousValues: any) => ({
            ...previousValues,
            [name]: validInput
        }));
    };

    const [addUser, { data, loading, error }] = useMutation(CREATE_USER_QUERY);

    const registerUser = async (ev: any) => {
        const data = await addUser({ variables: props.userValues });
        props.setUserValues(data?.data?.createUser);
        history.push("/home");
    };

    return (
        <BasePage title="Register" footer="">
            {error ? <pre>{error.message}</pre> : ""}
            {loading ? (
                <p>Register...</p>
            ) : (
                <form>
                    <IonList>
                        <IonItem>
                            <IonInput
                                value={props.userValues.fullname}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="fullname"
                                label="Full Name:"
                                className={`${
                                    isValid.fullname && "ion-valid"
                                } ${
                                    isValid.fullname === false && "ion-invalid"
                                } ${isTouched.fullname && "ion-touched"}`}
                                errorText="Invalid Full Name"
                                onIonBlur={() =>
                                    setIsTouched((previousValues: any) => ({
                                        ...previousValues,
                                        ["fullname"]: true
                                    }))
                                }
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput
                                value={props.userValues.email}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="email"
                                label="Email:"
                                type="email"
                                className={`${isValid.email && "ion-valid"} ${
                                    isValid.email === false && "ion-invalid"
                                } ${isTouched.email && "ion-touched"}`}
                                placeholder="email@domain.com"
                                errorText="Invalid Full Name"
                                onIonBlur={() =>
                                    setIsTouched((previousValues: any) => ({
                                        ...previousValues,
                                        ["email"]: true
                                    }))
                                }
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput
                                value={props.userValues.password}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="password"
                                label="Password:"
                                type="password"
                                className={`${
                                    isValid.password && "ion-valid"
                                } ${
                                    isValid.password === false && "ion-invalid"
                                } ${isTouched.password && "ion-touched"}`}
                                errorText="Invalid Password"
                                onIonBlur={() =>
                                    setIsTouched((previousValues: any) => ({
                                        ...previousValues,
                                        ["password"]: true
                                    }))
                                }
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput
                                value={props.userValues.cellphone}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="cellphone"
                                label="Cellphone:"
                                type="number"
                                className={`${
                                    isValid.cellphone && "ion-valid"
                                } ${
                                    isValid.cellphone === false && "ion-invalid"
                                } ${isTouched.cellphone && "ion-touched"}`}
                                errorText="Invalid Cellphone"
                                placeholder="3217654321"
                                onIonBlur={() =>
                                    setIsTouched((previousValues: any) => ({
                                        ...previousValues,
                                        ["cellphone"]: true
                                    }))
                                }
                            ></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton
                        disabled={
                            !isValid.email ||
                            !isValid.password ||
                            !isValid.fullname ||
                            !isValid.cellphone
                        }
                        type="button"
                        color="primary"
                        expand="full"
                        onClick={(ev) => registerUser(ev)}
                    >
                        Register
                    </IonButton>
                </form>
            )}
        </BasePage>
    );
};

export default Register;
