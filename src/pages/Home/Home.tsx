import React, { useEffect } from 'react';
import {
  IonAccordionGroup,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import BasePage from '../../BasePage';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { DELETE_PRODUCT_QUERY } from '../../common/graphql.querys';
import { FULL_VALID_PRODUCT } from '../../common/consts';
import { User, Product } from '../../types';
import './Home.css';

interface HomeProps {
  userValues: User;
  setProductValues: React.Dispatch<React.SetStateAction<Product>>;
  getProducts: () => void;
  dataGetProducts: any;
  loadingGetProducts: boolean;
  errorGetProducts: any;
  setIsProductValid: React.Dispatch<React.SetStateAction<any>>;
  setIsProductTouched: React.Dispatch<React.SetStateAction<any>>;
}

const Home: React.FC<HomeProps> = ({
  userValues,
  setProductValues,
  getProducts,
  dataGetProducts,
  loadingGetProducts,
  errorGetProducts,
  setIsProductValid,
  setIsProductTouched,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [deleteProduct, { loading: loadingDelete }] = useMutation(DELETE_PRODUCT_QUERY);

  useEffect(() => {
    if (userValues.email) {
      getProducts();
    }
  }, [userValues, getProducts]);

  const reload = (event: CustomEvent<RefresherEventDetail>) => {
    getProducts();
    event.detail.complete();
  };

  const editProduct = (product: Product) => {
    setProductValues(product);
    setIsProductValid(FULL_VALID_PRODUCT);
    setIsProductTouched(FULL_VALID_PRODUCT);
    history.push('/update');
  };

  const removeProduct = async (id: string) => {
    try {
      const { data } = await deleteProduct({ variables: { id } });
      if (data?.deleteProduct) {
        getProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const isAdmin = userValues.rol === 'admin';

  return (
    <BasePage
      title={t('home.title')}
      footer={t('home.welcome', { name: userValues.fullname || t('common.guest') })}
    >
      <IonRefresher slot="fixed" onIonRefresh={reload}>
        <IonRefresherContent />
      </IonRefresher>

      {errorGetProducts && (
        <IonText color="danger">
          <p className="ion-text-center">{errorGetProducts.message}</p>
        </IonText>
      )}

      {loadingGetProducts || loadingDelete ? (
        <LoadingSpinner />
      ) : (
        <>
          {dataGetProducts?.products && dataGetProducts.products.length > 0 ? (
            <IonAccordionGroup>
              {dataGetProducts.products.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  onEdit={editProduct}
                  onDelete={removeProduct}
                />
              ))}
            </IonAccordionGroup>
          ) : (
            <IonText className="ion-text-center ion-padding">
              <p>{t('home.noProducts')}</p>
            </IonText>
          )}
        </>
      )}
    </BasePage>
  );
};

export default Home;
