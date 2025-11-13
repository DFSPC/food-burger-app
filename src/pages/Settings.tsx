import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import BasePage from '../BasePage';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <BasePage title={t('settings.title')} footer="">
      <IonCard>
        <IonCardContent>
          <IonText color="medium" className="ion-text-center">
            <p style={{ marginBottom: '20px' }}>{t('settings.selectLanguage')}</p>
          </IonText>

          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton
                  expand="block"
                  fill={currentLanguage === 'en' ? 'solid' : 'outline'}
                  color={currentLanguage === 'en' ? 'primary' : 'medium'}
                  onClick={() => changeLanguage('en')}
                  style={{
                    height: '80px',
                    fontSize: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div>{t('settings.english')}</div>
                  {currentLanguage === 'en' && (
                    <IonIcon icon={checkmarkCircle} style={{ fontSize: '20px' }} />
                  )}
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  expand="block"
                  fill={currentLanguage === 'es' ? 'solid' : 'outline'}
                  color={currentLanguage === 'es' ? 'primary' : 'medium'}
                  onClick={() => changeLanguage('es')}
                  style={{
                    height: '80px',
                    fontSize: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div>{t('settings.spanish')}</div>
                  {currentLanguage === 'es' && (
                    <IonIcon icon={checkmarkCircle} style={{ fontSize: '20px' }} />
                  )}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </BasePage>
  );
};

export default Settings;
