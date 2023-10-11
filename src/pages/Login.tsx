import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput
} from "@ionic/react";

import { useLazyQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const Login: React.FC<{
    userValues: any;
    setUserValues: Function;
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

    const LOGIN_USER_QUERY = gql`
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
    const [getUserLogin, { loading, error, data }] = useLazyQuery(
        LOGIN_USER_QUERY,
        {
            fetchPolicy: "network-only"
        }
    );

    const loginUser = async (ev: any) => {
        const dataUser = await getUserLogin({ variables: props.userValues });
        props.setUserValues(dataUser?.data?.getUserByEmailPassword);
        props.getBurgers();
        history.push("/home");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {error ? <pre>{error.message}</pre> : ""}
                {loading ? (
                    <p>Login...</p>
                ) : (
                    <form>
                        <IonList>
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
                        </IonList>

                        <IonButton
                            type="button"
                            color="primary"
                            expand="full"
                            onClick={(ev) => loginUser(ev)}
                        >
                            Login
                        </IonButton>
                    </form>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Login;
