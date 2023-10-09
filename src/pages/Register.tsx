import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonList
} from "@ionic/react";

import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const Register: React.FC<{
    userValues: any;
    setUserValues: Function;
}> = (props) => {
    const history = useHistory();

    const handleInputChange = (ev: any) => {
        const { name, value, checked } = ev.target;
        let sendValue: any;
        if (checked == true) {
            sendValue = checked;
        } else if (checked == false) {
            sendValue = checked;
        } else if (isNaN(value) || value == "") {
            sendValue = value;
        } else {
            sendValue = parseFloat(value);
        }
        props.setUserValues((previousValues: any) => ({
            ...previousValues,
            [name]: sendValue
        }));
    };

    const CREATE_USER_QUERY = gql`
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

    const [addUser, { data, loading, error }] = useMutation(CREATE_USER_QUERY);

    const registerUser = async (ev: any) => {
        const data = await addUser({ variables: props.userValues });
        props.setUserValues(data?.data?.createUser);
        history.push("/home");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {error ? <pre>{error.message}</pre> : ""}
                {loading ? (
                    <p>Register...</p>
                ) : (
                    <form>
                        <IonList>
                            <IonItem>
                                <IonInput
                                    value={props.userValues.fullname}
                                    onIonInput={handleInputChange}
                                    name="fullname"
                                    label="Full Name:"
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    value={props.userValues.email}
                                    onIonInput={handleInputChange}
                                    name="email"
                                    label="Email:"
                                    type="email"
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    value={props.userValues.password}
                                    onIonInput={handleInputChange}
                                    name="password"
                                    label="Password:"
                                    type="password"
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    value={props.userValues.cellphone}
                                    onIonInput={handleInputChange}
                                    name="cellphone"
                                    label="Cellphone:"
                                    type="number"
                                ></IonInput>
                            </IonItem>
                        </IonList>

                        <IonButton
                            type="button"
                            color="primary"
                            expand="full"
                            onClick={(ev) => registerUser(ev)}
                        >
                            Register
                        </IonButton>
                    </form>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Register;
