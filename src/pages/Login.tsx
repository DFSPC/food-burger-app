import React, { useEffect } from 'react';
import {
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonText,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import BasePage from '../BasePage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';
import { LOGIN_USER_QUERY } from '../common/graphql.querys';
import { EMPTY_USER, EMPTY_VALID_USER } from '../common/consts';
import { User, UserValidation } from '../types';

interface LoginProps {
  userValues: User;
  setUserValues: React.Dispatch<React.SetStateAction<User>>;
  getBurgers: () => void;
}

const Login: React.FC<LoginProps> = ({ userValues, setUserValues, getBurgers }) => {
  const history = useHistory();
  const { values, setValues, handleChange } = useForm(EMPTY_USER);
  const { isValid, isTouched, validateInput, markAsTouched } =
    useValidation<UserValidation>(EMPTY_VALID_USER, EMPTY_VALID_USER);

  const [getUserLogin, { loading, error }] = useLazyQuery(LOGIN_USER_QUERY, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (userValues.token) {
      history.push('/home');
    }
  }, [userValues, history]);

  const loginUser = async () => {
    try {
      const { data } = await getUserLogin({ variables: values });
      if (data?.getUserByEmailPassword) {
        setUserValues(data.getUserByEmailPassword);
        getBurgers();
        history.push('/home');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const isFormValid = isValid.email && isValid.password;

  return (
    <BasePage title="Login" footer="">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className="ion-text-center">
            <h1>Welcome Back!</h1>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {error && (
            <IonText color="danger">
              <p className="ion-text-center">{error.message}</p>
            </IonText>
          )}

          {loading ? (
            <LoadingSpinner message="Logging in..." />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid) loginUser();
              }}
            >
              <IonList>
                <IonItem>
                  <IonIcon icon={mailOutline} slot="start" />
                  <IonInput
                    value={values.email}
                    className={`${isValid.email && 'ion-valid'} ${
                      isValid.email === false && 'ion-invalid'
                    } ${isTouched.email && 'ion-touched'}`}
                    onIonInput={(ev) => {
                      handleChange(ev);
                      validateInput(ev);
                    }}
                    errorText="Invalid email"
                    placeholder="email@domain.com"
                    name="email"
                    label="Email"
                    labelPlacement="floating"
                    type="email"
                    onIonBlur={() => markAsTouched('email')}
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={lockClosedOutline} slot="start" />
                  <IonInput
                    value={values.password}
                    className={`${isValid.password && 'ion-valid'} ${
                      isValid.password === false && 'ion-invalid'
                    } ${isTouched.password && 'ion-touched'}`}
                    onIonInput={(ev) => {
                      handleChange(ev);
                      validateInput(ev);
                    }}
                    errorText="Invalid password"
                    name="password"
                    label="Password"
                    labelPlacement="floating"
                    type="password"
                    onIonBlur={() => markAsTouched('password')}
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
                Login
              </IonButton>
            </form>
          )}
        </IonCardContent>
      </IonCard>
    </BasePage>
  );
};

export default Login;
