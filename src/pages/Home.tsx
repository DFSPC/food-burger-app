import {
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

const Home: React.FC<{ reloadData: Function; data: any; loading: boolean }> = (
    props
) => {
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

                {props.loading ? <p>Loading...</p> : ""}
                {props.data?.products
                    ? props.data.products.map((product: product) => (
                          <article key={product._id}>
                              <h3>{product.title}</h3>
                              <ul>
                                  <li>Description: {product.description}</li>
                                  <li>Price: {product.price}</li>
                                  <li>Image:</li>
                                  <img src={product.img_url}></img>
                              </ul>
                          </article>
                      ))
                    : ""}
            </IonContent>
        </IonPage>
    );
};

export default Home;
