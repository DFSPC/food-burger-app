import {
    IonAccordionGroup,
    IonAccordion,
    IonAlert,
    IonButton,
    IonItem,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonRow,
    IonCol,
    IonGrid
} from "@ionic/react";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_BURGERS_QUERY, DELETE_BURGER_QUERY } from "./../GraphQL";
import { useHistory, useLocation } from "react-router-dom";

import BasePage from "./../BasePage";
import { useEffect } from "react";

const Home: React.FC<{
    setBurgerValues: Function;
    userValues: any;
    setUserValues: Function;
}> = (props) => {
    const history = useHistory();
    let location = useLocation();

    const reload = (event: CustomEvent<RefresherEventDetail>) => {
        getBurgers();
        event.detail.complete();
    };

    const [
        getBurgers,
        {
            loading: loadingGetBurgers,
            error: errorGetBurgers,
            data: dataGetBurgers
        }
    ] = useLazyQuery(GET_BURGERS_QUERY, {
        fetchPolicy: "network-only"
    });

    const [
        deleteBurger,
        {
            loading: loadingDeleteBurger,
            error: errorDeleteBurger,
            data: dataDeleteBurger
        }
    ] = useMutation(DELETE_BURGER_QUERY);

    const editBurger = async (burger: any) => {
        props.setBurgerValues(burger);
        history.push("/update");
    };

    const removeBurger = async (id: string) => {
        const data = await deleteBurger({ variables: { id: id } });
        if (data.data?.deleteProduct) {
            getBurgers();
        }
    };

    useEffect(() => {
        if (location.pathname == "/home") {
            getBurgers();
        }
    }, [location.pathname]);

    return (
        <BasePage
            title="List of Burgers"
            footer={`Looged as ${props.userValues.fullname}`}
        >
            <IonRefresher slot="fixed" onIonRefresh={reload}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            {loadingGetBurgers || loadingDeleteBurger ? (
                "Loading..."
            ) : (
                <IonAccordionGroup>
                    {dataGetBurgers?.products
                        ? dataGetBurgers.products.map((product: any) => (
                              <IonAccordion key={product._id}>
                                  <IonItem slot="header">
                                      <IonLabel>{product.title}</IonLabel>
                                  </IonItem>
                                  <div className="ion-padding" slot="content">
                                      <ul>
                                          <li>
                                              Description: {product.description}
                                          </li>
                                          <li>Price: {product.price}</li>
                                          <li>Image:</li>
                                      </ul>
                                      <img src={product.img_url}></img>
                                      {props.userValues.rol == "admin" ? (
                                          <>
                                              <IonGrid>
                                                  <IonRow>
                                                      <IonCol class="ion-text-center">
                                                          <IonButton
                                                              color="primary"
                                                              expand="full"
                                                              onClick={(ev) =>
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
                                                          handler: () => {
                                                              return false;
                                                          }
                                                      },
                                                      {
                                                          text: "OK",
                                                          role: "confirm",
                                                          handler: () => {
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
                          ))
                        : ""}
                </IonAccordionGroup>
            )}
        </BasePage>
    );
};

export default Home;
