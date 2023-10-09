import { Redirect, Route } from "react-router-dom";
import {
    IonApp,
    IonIcon,
    IonTabs,
    IonTabBar,
    IonLabel,
    IonTabButton,
    IonRouterOutlet,
    setupIonicReact
} from "@ionic/react";
import { list, add } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Create from "./pages/CreateUpdate";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";

setupIonicReact();

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

const App: React.FC = () => {
    let { data, loading, refetch } = useQuery(GET_BURGERS_QUERY);

    const emptyProduct = {
        _id: "",
        title: "",
        description: "",
        price: "",
        featured: false,
        img_url: "",
        img_blob: ""
    };

    const [productValues, setProductValues] = useState(emptyProduct);

    async function reloadData() {
        await refetch();
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact path="/" to="/home" />
                        <Route
                            path="/home"
                            render={() => (
                                <Home
                                    reloadData={reloadData}
                                    dataBurgers={data}
                                    loadingBurgers={loading}
                                    setProductValues={setProductValues}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/create"
                            render={() => (
                                <Create
                                    action={"create"}
                                    reloadData={reloadData}
                                    productValues={productValues}
                                    setProductValues={setProductValues}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/update"
                            render={() => (
                                <Create
                                    action={"update"}
                                    reloadData={reloadData}
                                    productValues={productValues}
                                    setProductValues={setProductValues}
                                />
                            )}
                            exact={true}
                        />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/home">
                            <IonIcon icon={list} />
                            <IonLabel>Burgers</IonLabel>
                        </IonTabButton>

                        <IonTabButton
                            tab="create"
                            href="/create"
                            onClick={(ev) => setProductValues(emptyProduct)}
                        >
                            <IonIcon icon={add} />
                            <IonLabel>Create</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
