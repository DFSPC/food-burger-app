import { IonButton, IonList, IonItem, IonInput } from "@ionic/react";

import BasePage from "./../BasePage";

import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER_QUERY } from "./../GraphQL";
import { useHistory } from "react-router-dom";

const Login: React.FC<{
    userValues: any;
    setUserValues: Function;
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
        </BasePage>
    );
};

export default Login;
