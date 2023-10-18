import { IonButton, IonItem, IonInput, IonList } from "@ionic/react";
import BasePage from "./../BasePage";
import { useHistory } from "react-router-dom";
import {
    validateEmail,
    validatePassword,
    validateText,
    validateNumber
} from "./../common/validate";

const Register: React.FC<{
    userValues: any;
    setUserValues: Function;
    addUser: Function;
    loadingAddUser: boolean;
    errorAddUser: any;
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
        } else if (type == "text") {
            validInput = validateText(value);
        } else if (type == "number") {
            validInput = validateNumber(value);
        }
        props.setIsUserValid((previousValues: any) => ({
            ...previousValues,
            [name]: validInput
        }));
    };

    const registerUser = async (ev: any) => {
        const data = await props.addUser({ variables: props.userValues });
        props.setUserValues(data?.data?.createUser);
        props.getBurgers();
        history.push("/home");
    };

    return (
        <BasePage title="Register" footer="">
            {props.errorAddUser ? <pre>{props.errorAddUser.message}</pre> : ""}
            {props.loadingAddUser ? (
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
                                    props.isUserValid.fullname && "ion-valid"
                                } ${
                                    props.isUserValid.fullname === false &&
                                    "ion-invalid"
                                } ${
                                    props.isUserTouched.fullname &&
                                    "ion-touched"
                                }`}
                                errorText="Invalid Full Name"
                                onIonBlur={() =>
                                    props.setIsUserTouched(
                                        (previousValues: any) => ({
                                            ...previousValues,
                                            ["fullname"]: true
                                        })
                                    )
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
                                className={`${
                                    props.isUserValid.email && "ion-valid"
                                } ${
                                    props.isUserValid.email === false &&
                                    "ion-invalid"
                                } ${
                                    props.isUserTouched.email && "ion-touched"
                                }`}
                                placeholder="email@domain.com"
                                errorText="Invalid Email"
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
                                onIonInput={(ev) => {
                                    handleInputChange(ev);
                                    validateInput(ev);
                                }}
                                name="password"
                                label="Password:"
                                type="password"
                                className={`${
                                    props.isUserValid.password && "ion-valid"
                                } ${
                                    props.isUserValid.password === false &&
                                    "ion-invalid"
                                } ${
                                    props.isUserTouched.password &&
                                    "ion-touched"
                                }`}
                                errorText="Invalid Password"
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
                                    props.isUserValid.cellphone && "ion-valid"
                                } ${
                                    props.isUserValid.cellphone === false &&
                                    "ion-invalid"
                                } ${
                                    props.isUserTouched.cellphone &&
                                    "ion-touched"
                                }`}
                                errorText="Invalid Cellphone"
                                placeholder="3XXXXXXXXX"
                                onIonBlur={() =>
                                    props.setIsUserTouched(
                                        (previousValues: any) => ({
                                            ...previousValues,
                                            ["cellphone"]: true
                                        })
                                    )
                                }
                            ></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton
                        disabled={
                            !props.isUserValid.email ||
                            !props.isUserValid.password ||
                            !props.isUserValid.fullname ||
                            !props.isUserValid.cellphone
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
