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

import { useHistory } from "react-router-dom";
import BasePage from "./../BasePage";

import { FULL_VALID_BURGER } from "../common/consts";

const Home: React.FC<{
    setBurgerValues: Function;
    userValues: any;
    setUserValues: Function;
    getBurgers: Function;
    dataGetBurgers: any;
    loadingGetBurgers: boolean;
    errorGetBurgers: any;
    deleteBurger: Function;
    loadingDeleteBurger: boolean;
    setIsBurgerValid: Function;
    setIsBurgerTouched: Function;
}> = (props) => {
    const history = useHistory();

    const reload = (event: CustomEvent<RefresherEventDetail>) => {
        props.getBurgers();
        event.detail.complete();
    };

    const editBurger = async (burger: any) => {
        props.setBurgerValues(burger);
        props.setIsBurgerValid(FULL_VALID_BURGER);
        props.setIsBurgerTouched(FULL_VALID_BURGER);
        history.push("/update");
    };

    const removeBurger = async (id: string) => {
        const data = await props.deleteBurger({ variables: { id: id } });
        if (data.data?.deleteProduct) {
            props.getBurgers();
        }
    };

    return (
        <BasePage
            title="List of Burgers"
            footer={`Logged as ${props.userValues.fullname}`}
        >
            <IonRefresher slot="fixed" onIonRefresh={reload}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            {props.loadingGetBurgers || props.loadingDeleteBurger ? (
                "Loading..."
            ) : (
                <IonAccordionGroup>
                    {props.dataGetBurgers?.products
                        ? props.dataGetBurgers.products.map((product: any) => (
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
