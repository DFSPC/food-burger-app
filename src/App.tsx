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
import { list, add, logIn, personAdd, logOut, settings } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { useTranslation } from 'react-i18next';
import Home from "./pages/Home";
import CreateUpdate from "./pages/CreateUpdate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

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
    GET_PRODUCTS_QUERY,
    DELETE_PRODUCT_QUERY,
    CREATE_PRODUCT_QUERY,
    UPDATE_PRODUCT_QUERY,
    LOGIN_USER_QUERY,
    CREATE_USER_QUERY
} from "./common/graphql.querys";

import {
    EMPTY_PRODUCT,
    EMPTY_VALID_PRODUCT,
    EMPTY_USER,
    EMPTY_VALID_USER
} from "./common/consts";

import { useLazyQuery, useMutation } from "@apollo/client";

setupIonicReact();

const App: React.FC = () => {
    const { t } = useTranslation();
    const [productValues, setProductValues] = useState(EMPTY_PRODUCT);
    const [userValues, setUserValues] = useState(EMPTY_USER);
    const [alertLogoutOpen, setAlertLogoutOpen] = useState(false);

    const [isProductTouched, setIsProductTouched] = useState(EMPTY_VALID_PRODUCT);
    const [isProductValid, setIsProductValid] = useState(EMPTY_VALID_PRODUCT);

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
        getProducts,
        {
            loading: loadingGetProducts,
            error: errorGetProducts,
            data: dataGetProducts
        }
    ] = useLazyQuery(GET_PRODUCTS_QUERY, {
        fetchPolicy: "network-only"
    });

    const [
        addProduct,
        {
            data: dataAddProduct,
            loading: loadingAddProduct,
            error: errorAddProduct
        }
    ] = useMutation(CREATE_PRODUCT_QUERY);

    const [
        editProduct,
        {
            data: dataEditProduct,
            loading: loadingEditProduct,
            error: errorEditProduct
        }
    ] = useMutation(UPDATE_PRODUCT_QUERY);

    const [
        deleteProduct,
        {
            loading: loadingDeleteProduct,
            error: errorDeleteProduct,
            data: dataDeleteProduct
        }
    ] = useMutation(DELETE_PRODUCT_QUERY);

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
                                    setProductValues={setProductValues}
                                    getProducts={getProducts}
                                    dataGetProducts={dataGetProducts}
                                    loadingGetProducts={loadingGetProducts}
                                    errorGetProducts={errorGetProducts}
                                    setIsProductValid={setIsProductValid}
                                    setIsProductTouched={setIsProductTouched}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/create"
                            render={() => (
                                <CreateUpdate
                                    action={"create"}
                                    productValues={productValues}
                                    setProductValues={setProductValues}
                                    isProductValid={isProductValid}
                                    setIsProductValid={setIsProductValid}
                                    isProductTouched={isProductTouched}
                                    setIsProductTouched={setIsProductTouched}
                                    getProducts={getProducts}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/update"
                            render={() => (
                                <CreateUpdate
                                    action={"update"}
                                    productValues={productValues}
                                    setProductValues={setProductValues}
                                    isProductValid={isProductValid}
                                    setIsProductValid={setIsProductValid}
                                    isProductTouched={isProductTouched}
                                    setIsProductTouched={setIsProductTouched}
                                    getProducts={getProducts}
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
                                    getProducts={getProducts}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/register"
                            render={() => (
                                <Register
                                    setUserValues={setUserValues}
                                    getProducts={getProducts}
                                />
                            )}
                            exact={true}
                        />
                        <Route
                            path="/settings"
                            render={() => <Settings />}
                            exact={true}
                        />
                    </IonRouterOutlet>

                    {userValues.token ? (
                        <IonTabBar slot="bottom">
                            <IonTabButton
                                tab="home"
                                href="/home"
                                onClick={(ev) => {
                                    setProductValues(EMPTY_PRODUCT);
                                    setIsProductValid(EMPTY_VALID_PRODUCT);
                                    setIsProductTouched(EMPTY_VALID_PRODUCT);
                                }}
                            >
                                <IonIcon icon={list} />
                                <IonLabel>{t('menu.products')}</IonLabel>
                            </IonTabButton>
                            {userValues.rol == "admin" ? (
                                <IonTabButton
                                    tab="create"
                                    href="/create"
                                    onClick={(ev) => {
                                        setProductValues(EMPTY_PRODUCT);
                                        setIsProductValid(EMPTY_VALID_PRODUCT);
                                        setIsProductTouched(EMPTY_VALID_PRODUCT);
                                    }}
                                >
                                    <IonIcon icon={add} />
                                    <IonLabel>{t('menu.create')}</IonLabel>
                                </IonTabButton>
                            ) : (
                                <></>
                            )}
                            <IonTabButton
                                tab="settings"
                                href="/settings"
                            >
                                <IonIcon icon={settings} />
                                <IonLabel>{t('menu.settings')}</IonLabel>
                            </IonTabButton>
                            <IonTabButton
                                tab="logout"
                                onClick={(ev) => {
                                    setAlertLogoutOpen(true);
                                }}
                            >
                                <IonIcon icon={logOut} />
                                <IonLabel>{t('menu.logout')}</IonLabel>
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
                                <IonLabel>{t('menu.login')}</IonLabel>
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
                                <IonLabel>{t('menu.register')}</IonLabel>
                            </IonTabButton>

                            <IonTabButton
                                tab="settings"
                                href="/settings"
                            >
                                <IonIcon icon={settings} />
                                <IonLabel>{t('menu.settings')}</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    )}
                </IonTabs>
                <IonAlert
                    isOpen={alertLogoutOpen}
                    header={t('alerts.logoutTitle')}
                    buttons={[
                        {
                            text: t('common.cancel'),
                            role: "cancel",
                            handler: () => {
                                return false;
                            }
                        },
                        {
                            text: t('common.ok'),
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
