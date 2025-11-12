import React, { ReactNode } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonText,
} from '@ionic/react';

interface BasePageProps {
  title: string;
  footer?: string;
  children?: ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ title, footer, children }) => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar
          color="primary"
          style={{
            '--background': 'linear-gradient(135deg, #ff3b30 0%, #ff6b59 100%)',
            '--padding-top': '16px',
            '--padding-bottom': '16px',
          }}
        >
          <IonTitle
            className="ion-text-center"
            style={{
              fontSize: '16px',
              fontWeight: '700',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              letterSpacing: '0.3px',
            }}
          >
            {title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
      {footer && (
        <IonFooter>
          <IonToolbar
            style={{
              '--background': 'linear-gradient(135deg, #007aff 0%, #1a8bff 100%)',
              '--padding-top': '12px',
              '--padding-bottom': '12px',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '8px 16px',
              }}
            >
              <IonText
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {footer}
              </IonText>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default BasePage;
