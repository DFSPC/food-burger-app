import React from 'react';
import {
  IonButton,
  IonCheckbox,
  IonItem,
  IonInput,
  IonList,
  IonText,
  IonIcon,
  IonCard,
  IonCardContent,
  IonLabel,
} from '@ionic/react';
import {
  fastFoodOutline,
  documentTextOutline,
  pricetagOutline,
  imageOutline,
  starOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import BasePage from '../BasePage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';
import {
  CREATE_PRODUCT_QUERY,
  UPDATE_PRODUCT_QUERY,
} from '../common/graphql.querys';
import { EMPTY_PRODUCT, EMPTY_VALID_PRODUCT } from '../common/consts';
import { Product, ProductValidation } from '../types';

interface CreateUpdateProps {
  action: 'create' | 'update';
  productValues: Product;
  setProductValues: React.Dispatch<React.SetStateAction<Product>>;
  isProductValid: ProductValidation;
  setIsProductValid: React.Dispatch<React.SetStateAction<ProductValidation>>;
  isProductTouched: ProductValidation;
  setIsProductTouched: React.Dispatch<React.SetStateAction<ProductValidation>>;
  getProducts: () => void;
}

const CreateUpdate: React.FC<CreateUpdateProps> = ({
  action,
  productValues,
  setProductValues,
  isProductValid,
  setIsProductValid,
  isProductTouched,
  setIsProductTouched,
  getProducts,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { values, setValues, handleChange } = useForm(productValues);

  const [addProduct, { loading: loadingAdd, error: errorAdd }] =
    useMutation(CREATE_PRODUCT_QUERY);
  const [editProduct, { loading: loadingEdit, error: errorEdit }] =
    useMutation(UPDATE_PRODUCT_QUERY);

  const title = action === 'create' ? t('createUpdate.createTitle') : t('createUpdate.editTitle');
  const buttonLabel = action === 'create' ? t('common.create') : t('common.update');
  const loading = loadingAdd || loadingEdit;
  const error = errorAdd || errorEdit;

  React.useEffect(() => {
    setValues(productValues);
  }, [productValues, setValues]);

  const compressImage = async (file: File, maxSizeMB: number = 1): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Redimensionar si la imagen es muy grande
          const maxDimension = 1200; // píxeles
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Comprimir con calidad ajustable
          let quality = 0.8;
          const compress = () => {
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            const base64 = dataUrl.split(',')[1];
            const sizeInMB = (base64.length * 3) / 4 / (1024 * 1024);

            // Si aún es muy grande y podemos reducir más la calidad
            if (sizeInMB > maxSizeMB && quality > 0.3) {
              quality -= 0.1;
              compress();
            } else {
              resolve(base64);
            }
          };

          compress();
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const onFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) {
      try {
        // Comprimir a máximo 3MB para estar bien por debajo del límite de 4.5MB
        const base64 = await compressImage(file, 3);
        setValues((prev) => ({ ...prev, img_blob: base64 }));
        setProductValues((prev) => ({ ...prev, img_blob: base64 }));
      } catch (error) {
        console.error(t('createUpdate.errorCompressing'), error);
      }
    }
  };

  const validateInput = (ev: any) => {
    const { name, value, type } = ev.target;
    const isValid = type === 'number' ? !isNaN(parseFloat(value)) && value !== '' : value.trim().length > 0;

    setIsProductValid((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleInputChangeLocal = (ev: any) => {
    handleChange(ev);
    setProductValues((prev: any) => {
      const { name, value, type } = ev.target;
      return {
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || '' : value,
      };
    });
  };

  const createUpdateProduct = async () => {
    try {
      let data;
      if (action === 'create') {
        const result = await addProduct({ variables: values });
        data = result.data;
      } else {
        const result = await editProduct({ variables: values });
        data = result.data;
      }

      if (data?.createProduct?._id || data?.updateProduct?._id) {
        setProductValues(EMPTY_PRODUCT);
        getProducts();
        history.push('/home');
      }
    } catch (err) {
      console.error(t('createUpdate.errorSaving'), err);
    }
  };

  const isFormValid =
    isProductValid.title && isProductValid.description && isProductValid.price;

  return (
    <BasePage title={title} footer="">
      <IonCard>
        <IonCardContent>
          {error && (
            <IonText color="danger">
              <p className="ion-text-center">{error.message}</p>
            </IonText>
          )}

          {loading ? (
            <LoadingSpinner message={action === 'create' ? t('createUpdate.creating') : t('createUpdate.updating')} />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid) createUpdateProduct();
              }}
            >
              <IonList>
                <IonItem>
                  <IonIcon icon={fastFoodOutline} slot="start" />
                  <IonInput
                    value={values.title}
                    onIonInput={(ev) => {
                      handleInputChangeLocal(ev);
                      validateInput(ev);
                    }}
                    name="title"
                    label={t('createUpdate.productName')}
                    labelPlacement="floating"
                    className={`${isProductValid.title && 'ion-valid'} ${
                      isProductValid.title === false && 'ion-invalid'
                    } ${isProductTouched.title && 'ion-touched'}`}
                    errorText={t('createUpdate.errorProductName')}
                    onIonBlur={() =>
                      setIsProductTouched((prev) => ({ ...prev, title: true }))
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={documentTextOutline} slot="start" />
                  <IonInput
                    value={values.description}
                    onIonInput={(ev) => {
                      handleInputChangeLocal(ev);
                      validateInput(ev);
                    }}
                    name="description"
                    label={t('createUpdate.description')}
                    labelPlacement="floating"
                    className={`${isProductValid.description && 'ion-valid'} ${
                      isProductValid.description === false && 'ion-invalid'
                    } ${isProductTouched.description && 'ion-touched'}`}
                    errorText={t('createUpdate.errorDescription')}
                    onIonBlur={() =>
                      setIsProductTouched((prev) => ({ ...prev, description: true }))
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={pricetagOutline} slot="start" />
                  <IonInput
                    value={values.price}
                    onIonInput={(ev) => {
                      handleInputChangeLocal(ev);
                      validateInput(ev);
                    }}
                    name="price"
                    label={t('createUpdate.price')}
                    labelPlacement="floating"
                    type="number"
                    className={`${isProductValid.price && 'ion-valid'} ${
                      isProductValid.price === false && 'ion-invalid'
                    } ${isProductTouched.price && 'ion-touched'}`}
                    errorText={t('createUpdate.errorPrice')}
                    onIonBlur={() =>
                      setIsProductTouched((prev) => ({ ...prev, price: true }))
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={starOutline} slot="start" />
                  <IonCheckbox
                    onIonChange={(e) => {
                      const ev = {
                        target: {
                          name: 'featured',
                          checked: e.detail.checked,
                          value: e.detail.checked,
                        },
                      };
                      handleInputChangeLocal(ev);
                    }}
                    name="featured"
                    checked={values.featured}
                  >
                    <IonLabel>{t('createUpdate.featuredItem')}</IonLabel>
                  </IonCheckbox>
                </IonItem>

                <IonItem>
                  <IonIcon icon={imageOutline} slot="start" />
                  <IonLabel>{t('createUpdate.image')}</IonLabel>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ padding: '10px 0' }}
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
                {buttonLabel}
              </IonButton>

              <IonButton
                color="medium"
                expand="block"
                fill="outline"
                className="ion-margin-top"
                onClick={() => {
                  setProductValues(EMPTY_PRODUCT);
                  setIsProductValid(EMPTY_VALID_PRODUCT);
                  setIsProductTouched(EMPTY_VALID_PRODUCT);
                  history.push('/home');
                }}
              >
                {t('common.cancel')}
              </IonButton>
            </form>
          )}
        </IonCardContent>
      </IonCard>
    </BasePage>
  );
};

export default CreateUpdate;
