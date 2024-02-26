import { IonButton, IonList, IonItem, IonInput } from "@ionic/react";
import BasePage from "./../BasePage";
import { useHistory } from "react-router-dom";
import { validateEmail, validatePassword } from "./../common/validate";

import React, { useEffect } from "react";

const Login: React.FC<{
    userValues: any;
    setUserValues: Function;
    getUserLogin: Function;
    loadingUserLogin: boolean;
    errorUserLogin: any;
    isUserValid: any;
    setIsUserValid: Function;
    isUserTouched: any;
    setIsUserTouched: Function;
    getBurgers: Function;
}> = (props) => {
    const history = useHistory();

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
        }
        props.setIsUserValid((previousValues: any) => ({
            ...previousValues,
            [name]: validInput
        }));
    };

    const loginUser = async (ev: any) => {
        const dataUser = await props.getUserLogin({
            variables: props.userValues
        });
        if (dataUser?.data?.getUserByEmailPassword) {
            props.setUserValues(dataUser?.data?.getUserByEmailPassword);
            props.getBurgers();
            history.push("/home");
        }
    };

    useEffect(() => {
        if (props.userValues.token) {
            window.location.href = "/home";
        }
    }, [props.userValues]);

    return (
        <BasePage title="Login" footer="">
            {props.errorUserLogin ? (
                <pre>{props.errorUserLogin.message}</pre>
            ) : (
                ""
            )}
            {props.loadingUserLogin ? (
                <p>Login...</p>
            ) : (
                <form>
                    <IonList>
                        <IonItem>
                            <IonInput
                                value={props.userValues.email}
                                className={`${
                                    props.isUserValid.email && "ion-valid"
                                } ${
                                    props.isUserValid.email === false &&
                                    "ion-invalid"
                                } ${
                                    props.isUserTouched.email && "ion-touched"
                                }`}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                errorText="Invalid email"
                                placeholder="email@domain.com"
                                name="email"
                                label="Email:"
                                type="email"
                                onIonBlur={() =>
                                    props.setIsUserTouched(
                                        (previousValues: any) => ({
                                            ...previousValues,
                                            ["email"]: true
                                        })
                                    )
                                }
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput
                                value={props.userValues.password}
                                className={`${
                                    props.isUserValid.password && "ion-valid"
                                } ${
                                    props.isUserValid.password === false &&
                                    "ion-invalid"
                                } ${
                                    props.isUserTouched.password &&
                                    "ion-touched"
                                }`}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                errorText="Invalid password"
                                name="password"
                                label="Password:"
                                type="password"
                                onIonBlur={() =>
                                    props.setIsUserTouched(
                                        (previousValues: any) => ({
                                            ...previousValues,
                                            ["password"]: true
                                        })
                                    )
                                }
                            ></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton
                        disabled={
                            !props.isUserValid.email ||
                            !props.isUserValid.password
                        }
                        type="button"
                        color="primary"
                        expand="full"
                        onClick={(ev) => loginUser(ev)}
                    >
                        Login
                    </IonButton>
                </form>
            )}
        </BasePage>
    );
};

export default Login;
