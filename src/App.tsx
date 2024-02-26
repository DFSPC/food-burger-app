import { Redirect, Route } from "react-router-dom";
import {
    IonApp,
    IonAlert,
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

import React, { useEffect, useState } from "react";

import {
    GET_BURGERS_QUERY,
    DELETE_BURGER_QUERY,
    CREATE_BURGERS_QUERY,
    UPDATE_BURGER_QUERY,
    LOGIN_USER_QUERY,
    CREATE_USER_QUERY
} from "./common/graphql.querys";

import {
    EMPTY_BURGER,
    EMPTY_VALID_BURGER,
    EMPTY_USER,
    EMPTY_VALID_USER
} from "./common/consts";

import { useLazyQuery, useMutation } from "@apollo/client";

setupIonicReact();

const App: React.FC = () => {
    const [burgerValues, setBurgerValues] = useState(EMPTY_BURGER);
    const [userValues, setUserValues] = useState(EMPTY_USER);
    const [alertLogoutOpen, setAlertLogoutOpen] = useState(false);

    const [isBurgerTouched, setIsBurgerTouched] = useState(EMPTY_VALID_BURGER);
    const [isBurgerValid, setIsBurgerValid] = useState(EMPTY_VALID_BURGER);

    const [isUserTouched, setIsUserTouched] = useState(EMPTY_VALID_USER);
    const [isUserValid, setIsUserValid] = useState(EMPTY_VALID_USER);

    const logoutUser = () => {
        setUserValues(EMPTY_USER);
        localStorage.setItem("userValues", JSON.stringify(EMPTY_USER));
        window.location.href = "/login";
    };

    const [
        getUserLogin,
        {
            loading: loadingUserLogin,
            error: errorUserLogin,
            data: dataUserLogin
        }
    ] = useLazyQuery(LOGIN_USER_QUERY, {
        fetchPolicy: "network-only"
    });

    const [
        addUser,
        { loading: loadingAddUser, error: errorAddUser, data: dataAddUser }
    ] = useMutation(CREATE_USER_QUERY);

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
        addBurger,
        {
            data: dataAddBurger,
            loading: loadingAddBurger,
            error: errorAddBurger
        }
    ] = useMutation(CREATE_BURGERS_QUERY);

    const [
        editBurger,
        {
            data: dataEditBurger,
            loading: loadingEditBurger,
            error: errorEditBurger
        }
    ] = useMutation(UPDATE_BURGER_QUERY);

    const [
        deleteBurger,
        {
            loading: loadingDeleteBurger,
            error: errorDeleteBurger,
            data: dataDeleteBurger
        }
    ] = useMutation(DELETE_BURGER_QUERY);

    useEffect(() => {
        if (userValues.token) {
            localStorage.setItem("userValues", JSON.stringify(userValues));
        }
    }, [userValues]);

    useEffect(() => {
        const userValues = JSON.parse(
            localStorage.getItem("userValues") || "{}"
        );
        if (userValues.token) {
            setUserValues(userValues);
        }
    }, []);

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
                                    getBurgers={getBurgers}
                                    dataGetBurgers={dataGetBurgers}
                                    loadingGetBurgers={loadingGetBurgers}
                                    errorGetBurgers={errorGetBurgers}
                                    deleteBurger={deleteBurger}
                                    loadingDeleteBurger={loadingDeleteBurger}
                                    setIsBurgerValid={setIsBurgerValid}
                                    setIsBurgerTouched={setIsBurgerTouched}
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
                                    isBurgerValid={isBurgerValid}
                                    setIsBurgerValid={setIsBurgerValid}
                                    isBurgerTouched={isBurgerTouched}
                                    setIsBurgerTouched={setIsBurgerTouched}
                                    addBurger={addBurger}
                                    loadingAddBurger={loadingAddBurger}
                                    errorAddBurger={errorAddBurger}
                                    editBurger={editBurger}
                                    loadingEditBurger={loadingEditBurger}
                                    errorEditBurger={errorEditBurger}
                                    getBurgers={getBurgers}
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
                                    isBurgerValid={isBurgerValid}
                                    setIsBurgerValid={setIsBurgerValid}
                                    isBurgerTouched={isBurgerTouched}
                                    setIsBurgerTouched={setIsBurgerTouched}
                                    addBurger={addBurger}
                                    loadingAddBurger={loadingAddBurger}
                                    errorAddBurger={errorAddBurger}
                                    editBurger={editBurger}
                                    loadingEditBurger={loadingEditBurger}
                                    errorEditBurger={errorEditBurger}
                                    getBurgers={getBurgers}
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
                                    getUserLogin={getUserLogin}
                                    loadingUserLogin={loadingUserLogin}
                                    errorUserLogin={errorUserLogin}
                                    isUserValid={isUserValid}
                                    setIsUserValid={setIsUserValid}
                                    isUserTouched={isUserTouched}
                                    setIsUserTouched={setIsUserTouched}
                                    getBurgers={getBurgers}
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
                                    addUser={addUser}
                                    loadingAddUser={loadingAddUser}
                                    errorAddUser={errorAddUser}
                                    isUserValid={isUserValid}
                                    setIsUserValid={setIsUserValid}
                                    isUserTouched={isUserTouched}
                                    setIsUserTouched={setIsUserTouched}
                                    getBurgers={getBurgers}
                                />
                            )}
                            exact={true}
                        />
                    </IonRouterOutlet>

                    {userValues.token ? (
                        <IonTabBar slot="bottom">
                            <IonTabButton
                                tab="home"
                                href="/home"
                                onClick={(ev) => {
                                    setBurgerValues(EMPTY_BURGER);
                                    setIsBurgerValid(EMPTY_VALID_BURGER);
                                    setIsBurgerTouched(EMPTY_VALID_BURGER);
                                }}
                            >
                                <IonIcon icon={list} />
                                <IonLabel>Burgers</IonLabel>
                            </IonTabButton>
                            {userValues.rol == "admin" ? (
                                <IonTabButton
                                    tab="create"
                                    href="/create"
                                    onClick={(ev) => {
                                        setBurgerValues(EMPTY_BURGER);
                                        setIsBurgerValid(EMPTY_VALID_BURGER);
                                        setIsBurgerTouched(EMPTY_VALID_BURGER);
                                    }}
                                >
                                    <IonIcon icon={add} />
                                    <IonLabel>Create</IonLabel>
                                </IonTabButton>
                            ) : (
                                <></>
                            )}
                            <IonTabButton
                                tab="logout"
                                onClick={(ev) => {
                                    setAlertLogoutOpen(true);
                                }}
                            >
                                <IonIcon icon={logOut} />
                                <IonLabel>Log Out</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    ) : (
                        <IonTabBar slot="bottom">
                            <IonTabButton
                                tab="login"
                                href="/login"
                                onClick={(ev) => {
                                    setUserValues(EMPTY_USER);
                                    setIsUserValid(EMPTY_VALID_USER);
                                    setIsUserTouched(EMPTY_VALID_USER);
                                }}
                            >
                                <IonIcon icon={logIn} />
                                <IonLabel>Login</IonLabel>
                            </IonTabButton>

                            <IonTabButton
                                tab="register"
                                href="/register"
                                onClick={(ev) => {
                                    setUserValues(EMPTY_USER);
                                    setIsUserValid(EMPTY_VALID_USER);
                                    setIsUserTouched(EMPTY_VALID_USER);
                                }}
                            >
                                <IonIcon icon={personAdd} />
                                <IonLabel>Register</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    )}
                </IonTabs>
                <IonAlert
                    isOpen={alertLogoutOpen}
                    header="Logout of App?"
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
                                logoutUser();
                            }
                        }
                    ]}
                    onDidDismiss={() => setAlertLogoutOpen(false)}
                ></IonAlert>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
