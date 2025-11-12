import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="ion-text-center ion-padding">
      <IonSpinner name="crescent" />
      <IonText>
        <p>{message}</p>
      </IonText>
    </div>
  );
};

export default LoadingSpinner;
