import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
} from "@ionic/react";
import "./Home.css";

import React, { useState } from "react";

import { useMutation, gql } from "@apollo/client";

const Create: React.FC = () => {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    featured: false,
    imgUrl: "",
  };

  const CREATE_BURGERS_QUERY = gql`
    mutation CreateProduct(
      $title: String!
      $imgUrl: String!
      $price: Float!
      $featured: Boolean!
      $description: String!
    ) {
      createProduct(
        title: $title
        img_url: $imgUrl
        price: $price
        featured: $featured
        description: $description
      ) {
        _id
        description
        featured
        img_url
        price
        title
      }
    }
  `;

  const [values, setValues] = useState(initialValues);

  const [addBurger, { data, loading, error }] =
    useMutation(CREATE_BURGERS_QUERY);

  const convertBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve((fileReader.result as string).split(",").pop());
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const createPost = async (ev: any) => {
    const data = await addBurger({ variables: values });
    if (data.data?.createProduct?._id) {
      console.log("Force updated");
      setValues(initialValues);
    }
  };

  const onFileChange = async (ev: any) => {
    const file = ev.target.files[0];
    const base64 = await convertBase64(file);
    setValues({
      ...values,
      ["imgUrl"]: base64 as string,
    });
  };

  const handleInputChange = (ev: any) => {
    const { name, value, checked } = ev.target;
    let sendValue: any;
    if (checked) {
      sendValue = checked;
    } else if (isNaN(value)) {
      sendValue = value;
    } else {
      sendValue = parseFloat(value);
    }
    setValues((previousValues) => ({ ...previousValues, [name]: sendValue }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Burger</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {data?.createProduct?._id ? <p>Created Burger</p> : ""}
        {error ? <pre>{error.message}</pre> : ""}
        {loading ? (
          <p>Creating...</p>
        ) : (
          <form>
            <IonList>
              <IonItem>
                <IonInput
                  value={values.title}
                  onIonChange={handleInputChange}
                  name="title"
                  label="Title:"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonInput
                  value={values.description}
                  onIonChange={handleInputChange}
                  name="description"
                  label="Description:"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonInput
                  value={values.price}
                  onIonChange={handleInputChange}
                  name="price"
                  label="Price:"
                  type="number"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonCheckbox
                  value={values.featured}
                  onIonChange={handleInputChange}
                  name="featured"
                >
                  Featured?
                </IonCheckbox>
              </IonItem>

              <IonItem>
                <IonLabel>Image:</IonLabel>
                <input
                  name="image"
                  type="file"
                  onChange={(ev) => onFileChange(ev)}
                ></input>
              </IonItem>
            </IonList>

            <IonButton
              type="button"
              color="primary"
              expand="full"
              onClick={(ev) => createPost(ev)}
            >
              Create
            </IonButton>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Create;
