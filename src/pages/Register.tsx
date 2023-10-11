import { IonButton, IonItem, IonInput, IonList } from "@ionic/react";

import BasePage from "./../BasePage";

import { useMutation } from "@apollo/client";
import { CREATE_USER_QUERY } from "./../GraphQL";
import { useHistory } from "react-router-dom";

const Register: React.FC<{
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
        </BasePage>
    );
};

export default Register;
