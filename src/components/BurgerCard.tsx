import React from 'react';
import {
  IonAccordion,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonIcon,
} from '@ionic/react';
import { pricetagOutline, star } from 'ionicons/icons';
import { Burger } from '../types';

interface BurgerCardProps {
  burger: Burger;
  isAdmin: boolean;
  onEdit: (burger: Burger) => void;
  onDelete: (id: string) => void;
}

const BurgerCard: React.FC<BurgerCardProps> = ({ burger, isAdmin, onEdit, onDelete }) => {
  return (
    <IonAccordion key={burger._id}>
      <IonItem slot="header" color="light">
        <IonLabel>
          <h2>{burger.title}</h2>
          <p className="ion-text-wrap">{burger.description}</p>
        </IonLabel>
        {burger.featured && (
          <IonChip
            color="warning"
            slot="end"
            style={{
              boxShadow: '0 4px 12px rgba(255, 204, 0, 0.6)',
              padding: '10px',
              background: 'linear-gradient(135deg, #ffcc00 0%, #ff9500 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IonIcon icon={star} style={{ color: '#000000', fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.8))', margin: 0 }} />
          </IonChip>
        )}
      </IonItem>
      <IonCardContent slot="content" className="ion-padding">
        <IonCard>
          {burger.img_url && (
            <img
              src={burger.img_url}
              alt={burger.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'cover',
              }}
            />
          )}
          <IonCardHeader style={{ background: 'linear-gradient(135deg, #ffcc00 0%, #ffd11a 100%)', padding: '16px' }}>
            <IonCardTitle style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textShadow: '0 2px 4px rgba(255,255,255,0.5)'
            }}>
              <IonIcon icon={pricetagOutline} style={{ fontSize: '28px' }} />
              ${burger.price}
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>

        {isAdmin && (
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton color="primary" expand="block" onClick={() => onEdit(burger)}>
                  Edit
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  id={`delete-alert-${burger._id}`}
                  color="danger"
                  expand="block"
                >
                  Delete
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        <IonAlert
          header="Delete Burger?"
          message="Are you sure you want to delete this burger?"
          trigger={`delete-alert-${burger._id}`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Delete',
              role: 'confirm',
              handler: () => onDelete(burger._id),
            },
          ]}
        />
      </IonCardContent>
    </IonAccordion>
  );
};

export default BurgerCard;
