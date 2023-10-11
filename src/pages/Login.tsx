import { IonButton, IonList, IonItem, IonInput } from "@ionic/react";

import BasePage from "./../BasePage";

import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER_QUERY } from "./../GraphQL";
import { useHistory } from "react-router-dom";

import React, { useState } from "react";

const Login: React.FC<{
    userValues: any;
    setUserValues: Function;
}> = (props) => {
    const history = useHistory();

    const emptyForm = {
        email: false,
        password: false,
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

    const validateEmail = (email: string) => {
        return email.match(
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ) != null;
    };

    const validatePassword = (password: string) => {
        return password.length > 0;
    };

    const validateInput = (ev: any) => {
        const { name, value, checked, type } = ev.target;
        let validInput: any;
        if (type == "email") {
            validInput = validateEmail(value);
        } else if (type == "password") {
            validInput = validatePassword(value);
        }
        setIsValid((previousValues: any) => ({
            ...previousValues,
            [name]: validInput
        }));
    }


    const [getUserLogin, { loading, error, data }] = useLazyQuery(
        LOGIN_USER_QUERY,
        {
            fetchPolicy: "network-only"
        }
    );

    const loginUser = async (ev: any) => {
        const dataUser = await getUserLogin({ variables: props.userValues });
        if (dataUser?.data?.getUserByEmailPassword) {
            props.setUserValues(dataUser?.data?.getUserByEmailPassword);
            history.push("/home");
        }
    };

    return (
        <BasePage title="Login" footer="">
            {error ? <pre>{error.message}</pre> : ""}
            {loading ? (
                <p>Login...</p>
            ) : (
                <form>
                    <IonList>
                        <IonItem>
                            <IonInput
                                className={`${isValid.email && 'ion-valid'} ${isValid.email === false && 'ion-invalid'} ${isTouched.email && 'ion-touched'}`}
                                value={props.userValues.email}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                errorText="Invalid email"
                                placeholder="email@domain.com"
                                name="email"
                                label="Email:"
                                type="email"
                                onIonBlur={() => setIsTouched((previousValues: any) => ({
                                    ...previousValues,
                                    ['email']: true
                                }))}
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput
                                value={props.userValues.password}
                                className={`${isValid.password && 'ion-valid'} ${isValid.password === false && 'ion-invalid'} ${isTouched.password && 'ion-touched'}`}
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                errorText="Invalid password"
                                name="password"
                                label="Password:"
                                type="password"
                                onIonBlur={() => setIsTouched((previousValues: any) => ({
                                    ...previousValues,
                                    ['password']: true
                                }))}
                            ></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton
                        disabled={!isValid.email || !isValid.password}
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
