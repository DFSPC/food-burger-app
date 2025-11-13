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
} from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
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
  getProducts: () => void;
}

const Login: React.FC<LoginProps> = ({ userValues, setUserValues, getProducts }) => {
  const { t } = useTranslation();
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
        getProducts();
        history.push('/home');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const isFormValid = isValid.email && isValid.password;

  return (
    <BasePage title={t('login.title')} footer="">
      <IonCard>
        <IonCardContent>
          {error && (
            <IonText color="danger">
              <p className="ion-text-center">{error.message}</p>
            </IonText>
          )}

          {loading ? (
            <LoadingSpinner message={t('login.loggingIn')} />
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
                    errorText={t('login.invalidEmail')}
                    placeholder="email@domain.com"
                    name="email"
                    label={t('login.email')}
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
                    errorText={t('login.invalidPassword')}
                    name="password"
                    label={t('login.password')}
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
                {t('login.title')}
              </IonButton>
            </form>
          )}
        </IonCardContent>
      </IonCard>
    </BasePage>
  );
};

export default Login;
