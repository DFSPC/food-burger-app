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
import { list, add, logIn, personAdd, logOut } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import CreateUpdate from "./pages/CreateUpdate";
import Login from "./pages/Login";
import Register from "./pages/Register";

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

import { useLazyQuery, gql } from "@apollo/client";

setupIonicReact();

const App: React.FC = () => {
    const emptyBurger = {
        _id: "",
        title: "",
        description: "",
        price: "",
        featured: false,
        img_url: "",
        img_blob: ""
    };

    const emptyUser = {
        _id: "",
        fullname: "",
        email: "",
        password: "",
        cellphone: "",
        rol: "",
        token: ""
    };

    const [burgerValues, setBurgerValues] = useState(emptyBurger);
    const [userValues, setUserValues] = useState(emptyUser);

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact path="/" to="/login" />
                        <Route
                            path="/home"
                            render={() => (
                                <Home
                                    userValues={userValues}
                                    setBurgerValues={setBurgerValues}
                                    setUserValues={setUserValues}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/create"
                            render={() => (
                                <CreateUpdate
                                    action={"create"}
                                    burgerValues={burgerValues}
                                    setBurgerValues={setBurgerValues}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/update"
                            render={() => (
                                <CreateUpdate
                                    action={"update"}
                                    burgerValues={burgerValues}
                                    setBurgerValues={setBurgerValues}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/login"
                            render={() => (
                                <Login
                                    userValues={userValues}
                                    setUserValues={setUserValues}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/register"
                            render={() => (
                                <Register
                                    userValues={userValues}
                                    setUserValues={setUserValues}
                                />
                            )}
                            exact={true}
                        />
                    </IonRouterOutlet>

                    {userValues.token ? (
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="home" href="/home">
                                <IonIcon icon={list} />
                                <IonLabel>Burgers</IonLabel>
                            </IonTabButton>
                            {userValues.rol == "admin" ? (
                                <IonTabButton
                                    tab="create"
                                    href="/create"
                                    onClick={(ev) =>
                                        setBurgerValues(emptyBurger)
                                    }
                                >
                                    <IonIcon icon={add} />
                                    <IonLabel>Create</IonLabel>
                                </IonTabButton>
                            ) : (
                                <></>
                            )}
                            <IonTabButton
                                tab="login"
                                href="/login"
                                onClick={(ev) => setUserValues(emptyUser)}
                            >
                                <IonIcon icon={logOut} />
                                <IonLabel>Log Out</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    ) : (
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="login" href="/login">
                                <IonIcon icon={logIn} />
                                <IonLabel>Login</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="register" href="/register">
                                <IonIcon icon={personAdd} />
                                <IonLabel>Register</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    )}
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
