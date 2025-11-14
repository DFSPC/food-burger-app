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
import { Product } from '../../types';
import './ProductCard.css';

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
            className="product-card-featured-chip"
          >
            <IonIcon icon={star} className="product-card-star-icon" />
          </IonChip>
        )}
      </IonItem>
      <IonCardContent slot="content" className="ion-padding">
        <IonCard>
          {product.img_url && (
            <img
              src={product.img_url}
              alt={product.title}
              className="product-card-image"
            />
          )}
          <IonCardHeader className="product-card-header">
            <IonCardTitle className="product-card-title">
              <IonIcon icon={pricetagOutline} className="product-card-price-icon" />
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
