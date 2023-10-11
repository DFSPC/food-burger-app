import {
    IonAccordionGroup,
    IonAccordion,
    IonAlert,
    IonButton,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonRow,
    IonCol,
    IonGrid,
    IonFooter
} from "@ionic/react";

import { useMutation, gql } from "@apollo/client";

import { useHistory } from "react-router-dom";

interface product {
    _id: string;
    title: string;
    description: string;
    img_url: string;
    price: number;
}

const Home: React.FC<{
    getBurgers: Function;
    dataBurgers: any;
    loadingBurgers: boolean;
    setProductValues: Function;
    userValues: any;
    setUserValues: Function;
}> = (props) => {
    const history = useHistory();

    const reload = (event: CustomEvent<RefresherEventDetail>) => {
        props.getBurgers();
        event.detail.complete();
    };

    const DELETE_BURGER_QUERY = gql`
        mutation DeleteProduct($id: ID!) {
            deleteProduct(_id: $id)
        }
    `;

    const editBurger = async (product: product) => {
        props.setProductValues(product);
        history.push("/update");
    };

    const [deleteBurger, { data, loading, error }] =
        useMutation(DELETE_BURGER_QUERY);

    const removeBurger = async (id: string) => {
        const data = await deleteBurger({ variables: { id: id } });
        if (data.data?.deleteProduct) {
            props.getBurgers();
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="ion-text-center">
                    <IonTitle>List of Burgers</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={reload}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {props.loadingBurgers ? (
                    "Loading..."
                ) : (
                    <IonAccordionGroup>
                        {props.dataBurgers?.products
                            ? props.dataBurgers.products.map(
                                  (product: product) => (
                                      <IonAccordion key={product._id}>
                                          <IonItem slot="header">
                                              <IonLabel>
                                                  {product.title}
                                              </IonLabel>
                                          </IonItem>
                                          <div
                                              className="ion-padding"
                                              slot="content"
                                          >
                                              <ul>
                                                  <li>
                                                      Description:{" "}
                                                      {product.description}
                                                  </li>
                                                  <li>
                                                      Price: {product.price}
                                                  </li>
                                                  <li>Image:</li>
                                              </ul>
                                              <img src={product.img_url}></img>
                                              {props.userValues.rol ==
                                              "admin" ? (
                                                  <>
                                                      <IonGrid>
                                                          <IonRow>
                                                              <IonCol class="ion-text-center">
                                                                  <IonButton
                                                                      color="primary"
                                                                      expand="full"
                                                                      onClick={(
                                                                          ev
                                                                      ) =>
                                                                          editBurger(
                                                                              product
                                                                          )
                                                                      }
                                                                  >
                                                                      Edit
                                                                  </IonButton>
                                                              </IonCol>
                                                              <IonCol class="ion-text-center">
                                                                  <IonButton
                                                                      id={`delete-alert-${product._id}`}
                                                                      color="primary"
                                                                      expand="full"
                                                                  >
                                                                      Delete
                                                                  </IonButton>
                                                              </IonCol>
                                                          </IonRow>
                                                      </IonGrid>
                                                      <IonAlert
                                                          header="Delete Burger?"
                                                          trigger={`delete-alert-${product._id}`}
                                                          buttons={[
                                                              {
                                                                  text: "Cancel",
                                                                  role: "cancel",
                                                                  handler:
                                                                      () => {
                                                                          return false;
                                                                      }
                                                              },
                                                              {
                                                                  text: "OK",
                                                                  role: "confirm",
                                                                  handler:
                                                                      () => {
                                                                          removeBurger(
                                                                              product._id
                                                                          );
                                                                      }
                                                              }
                                                          ]}
                                                          onDidDismiss={({
                                                              detail
                                                          }) => {
                                                              return false;
                                                          }}
                                                      ></IonAlert>
                                                  </>
                                              ) : (
                                                  ""
                                              )}
                                          </div>
                                      </IonAccordion>
                                  )
                              )
                            : ""}
                    </IonAccordionGroup>
                )}
            </IonContent>
            <IonFooter>
                <IonToolbar className="ion-text-center">
                    <IonLabel>Logged as {props.userValues.fullname}</IonLabel>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Home;
