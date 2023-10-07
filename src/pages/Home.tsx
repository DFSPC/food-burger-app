import {
    IonAccordionGroup,
    IonAccordion,
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
    RefresherEventDetail
} from "@ionic/react";
import "./Home.css";

interface product {
    _id: string;
    title: string;
    description: string;
    img_url: string;
    price: number;
}

const Home: React.FC<{ reloadData: Function; data: any }> = (props) => {
    const reload = (event: CustomEvent<RefresherEventDetail>) => {
        props.reloadData();
        event.detail.complete();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>List of Burgers</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={reload}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {props.data?.products
                    ? props.data.products.map((product: product) => (
                          <IonAccordionGroup>
                              <IonAccordion value={product._id}>
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
                                      <IonButton
                                          type="button"
                                          color="primary"
                                          expand="full"
                                          onClick={(ev) => ev}
                                      >
                                          Delete
                                      </IonButton>
                                  </div>
                              </IonAccordion>
                          </IonAccordionGroup>
                      ))
                    : ""}
            </IonContent>
        </IonPage>
    );
};

export default Home;
