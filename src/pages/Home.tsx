import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import "./Home.css";

import { useQuery, gql } from "@apollo/client";

interface product {
  _id: string;
  title: string;
  description: string;
  img_url: string;
  price: number;
}

const GET_BURGERS_QUERY = gql`
  query Products {
    products {
      _id
      title
      description
      img_url
      price
      featured
    }
  }
`;

const Home: React.FC = () => {
  let { data, loading, error, refetch } = useQuery(GET_BURGERS_QUERY);
  async function reloadData(event: CustomEvent<RefresherEventDetail>) {
    await refetch();
    event.detail.complete();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List of Burgers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={reloadData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {loading ? <p>Loading...</p> : ""}
        {error ? <pre>{error.message}</pre> : ""}
        {data?.products
          ? data.products.map((product: product) => (
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
