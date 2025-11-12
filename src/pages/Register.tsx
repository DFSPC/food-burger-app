import React from 'react';
import {
  IonButton,
  IonItem,
  IonInput,
  IonList,
  IonText,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  callOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import BasePage from '../BasePage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';
import { CREATE_USER_QUERY } from '../common/graphql.querys';
import { EMPTY_USER, EMPTY_VALID_USER } from '../common/consts';
import { User, UserValidation } from '../types';

interface RegisterProps {
  setUserValues: React.Dispatch<React.SetStateAction<User>>;
  getBurgers: () => void;
}

const Register: React.FC<RegisterProps> = ({ setUserValues, getBurgers }) => {
  const history = useHistory();
  const { values, handleChange } = useForm(EMPTY_USER);
  const { isValid, isTouched, validateInput, markAsTouched } =
    useValidation<UserValidation>(EMPTY_VALID_USER, EMPTY_VALID_USER);

  const [addUser, { loading, error }] = useMutation(CREATE_USER_QUERY);

  const registerUser = async () => {
    try {
      const { data } = await addUser({ variables: values });
      if (data?.createUser) {
        setUserValues(data.createUser);
        getBurgers();
        history.push('/home');
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const isFormValid =
    isValid.email && isValid.password && isValid.fullname && isValid.cellphone;

  return (
    <BasePage title="Register" footer="">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className="ion-text-center">
            <h1>Create Account</h1>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {error && (
            <IonText color="danger">
              <p className="ion-text-center">{error.message}</p>
            </IonText>
          )}

          {loading ? (
            <LoadingSpinner message="Creating account..." />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid) registerUser();
              }}
            >
              <IonList>
                <IonItem>
                  <IonIcon icon={personOutline} slot="start" />
                  <IonInput
                    value={values.fullname}
                    onIonInput={(ev) => {
                      handleChange(ev);
                      validateInput(ev);
                    }}
                    name="fullname"
                    label="Full Name"
                    labelPlacement="floating"
                    className={`${isValid.fullname && 'ion-valid'} ${
                      isValid.fullname === false && 'ion-invalid'
                    } ${isTouched.fullname && 'ion-touched'}`}
                    errorText="Invalid Full Name"
                    onIonBlur={() => markAsTouched('fullname')}
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={mailOutline} slot="start" />
                  <IonInput
                    value={values.email}
                    onIonInput={(ev) => {
                      handleChange(ev);
                      validateInput(ev);
                    }}
                    name="email"
                    label="Email"
                    labelPlacement="floating"
                    type="email"
                    className={`${isValid.email && 'ion-valid'} ${
                      isValid.email === false && 'ion-invalid'
                    } ${isTouched.email && 'ion-touched'}`}
                    placeholder="email@domain.com"
                    errorText="Invalid Email"
                    onIonBlur={() => markAsTouched('email')}
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={lockClosedOutline} slot="start" />
                  <IonInput
                    value={values.password}
                    onIonInput={(ev) => {
                      handleChange(ev);
                      validateInput(ev);
                    }}
                    name="password"
                    label="Password"
                    labelPlacement="floating"
                    type="password"
                    className={`${isValid.password && 'ion-valid'} ${
                      isValid.password === false && 'ion-invalid'
                    } ${isTouched.password && 'ion-touched'}`}
                    errorText="Invalid Password"
                    onIonBlur={() => markAsTouched('password')}
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={callOutline} slot="start" />
                  <IonInput
                    value={values.cellphone}
                    onIonInput={(ev) => {
                      handleChange(ev);
                      validateInput(ev);
                    }}
                    name="cellphone"
                    label="Phone Number"
                    labelPlacement="floating"
                    type="number"
                    className={`${isValid.cellphone && 'ion-valid'} ${
                      isValid.cellphone === false && 'ion-invalid'
                    } ${isTouched.cellphone && 'ion-touched'}`}
                    errorText="Invalid Phone Number"
                    placeholder="3XXXXXXXXX"
                    onIonBlur={() => markAsTouched('cellphone')}
                  />
                </IonItem>
              </IonList>

              <IonButton
                disabled={!isFormValid}
                type="submit"
                color="primary"
                expand="block"
                className="ion-margin-top"
              >
                Register
              </IonButton>
            </form>
          )}
        </IonCardContent>
      </IonCard>
    </BasePage>
  );
};

export default Register;
