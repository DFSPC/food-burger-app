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
import { useTranslation } from 'react-i18next';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <IonAccordion key={product._id}>
      <IonItem slot="header" color="light">
        <IonLabel>
          <h2>{product.title}</h2>
          <p className="ion-text-wrap">{product.description}</p>
        </IonLabel>
        {product.featured && (
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
          {product.img_url && (
            <img
              src={product.img_url}
              alt={product.title}
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
              ${product.price}
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>

        {isAdmin && (
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton color="primary" expand="block" onClick={() => onEdit(product)}>
                  {t('common.edit')}
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  id={`delete-alert-${product._id}`}
                  color="danger"
                  expand="block"
                >
                  {t('common.delete')}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        <IonAlert
          header={t('alerts.deleteProduct')}
          message={t('alerts.deleteProductMessage')}
          trigger={`delete-alert-${product._id}`}
          buttons={[
            {
              text: t('common.cancel'),
              role: 'cancel',
            },
            {
              text: t('common.delete'),
              role: 'confirm',
              handler: () => onDelete(product._id),
            },
          ]}
        />
      </IonCardContent>
    </IonAccordion>
  );
};

export default ProductCard;
