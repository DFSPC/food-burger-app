import React, { useEffect } from "react";
import {
    IonAccordionGroup,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonText
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import BasePage from "../BasePage";
import BurgerCard from "../components/BurgerCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { DELETE_BURGER_QUERY } from "../common/graphql.querys";
import { FULL_VALID_BURGER } from "../common/consts";
import { User, Burger } from "../types";

interface HomeProps {
    userValues: User;
    setBurgerValues: React.Dispatch<React.SetStateAction<Burger>>;
    getBurgers: () => void;
    dataGetBurgers: any;
    loadingGetBurgers: boolean;
    errorGetBurgers: any;
    setIsBurgerValid: React.Dispatch<React.SetStateAction<any>>;
    setIsBurgerTouched: React.Dispatch<React.SetStateAction<any>>;
}

const Home: React.FC<HomeProps> = ({
    userValues,
    setBurgerValues,
    getBurgers,
    dataGetBurgers,
    loadingGetBurgers,
    errorGetBurgers,
    setIsBurgerValid,
    setIsBurgerTouched
}) => {
    const history = useHistory();
    const [deleteBurger, { loading: loadingDelete }] =
        useMutation(DELETE_BURGER_QUERY);

    useEffect(() => {
        if (userValues.email) {
            getBurgers();
        }
    }, [userValues, getBurgers]);

    const reload = (event: CustomEvent<RefresherEventDetail>) => {
        getBurgers();
        event.detail.complete();
    };

    const editBurger = (burger: Burger) => {
        setBurgerValues(burger);
        setIsBurgerValid(FULL_VALID_BURGER);
        setIsBurgerTouched(FULL_VALID_BURGER);
        history.push("/update");
    };

    const removeBurger = async (id: string) => {
        try {
            const { data } = await deleteBurger({ variables: { id } });
            if (data?.deleteProduct) {
                getBurgers();
            }
        } catch (error) {
            console.error("Error deleting burger:", error);
        }
    };

    const isAdmin = userValues.rol === "admin";

    return (
        <BasePage
            title="🍔 Food Burger Menu 🍔"
            footer={`👋 Welcome, ${userValues.fullname || "Guest"}!`}
        >
            <IonRefresher slot="fixed" onIonRefresh={reload}>
                <IonRefresherContent />
            </IonRefresher>

            {errorGetBurgers && (
                <IonText color="danger">
                    <p className="ion-text-center">{errorGetBurgers.message}</p>
                </IonText>
            )}

            {loadingGetBurgers || loadingDelete ? (
                <LoadingSpinner />
            ) : (
                <>
                    {dataGetBurgers?.products &&
                    dataGetBurgers.products.length > 0 ? (
                        <IonAccordionGroup>
                            {dataGetBurgers.products.map((product: Burger) => (
                                <BurgerCard
                                    key={product._id}
                                    burger={product}
                                    isAdmin={isAdmin}
                                    onEdit={editBurger}
                                    onDelete={removeBurger}
                                />
                            ))}
                        </IonAccordionGroup>
                    ) : (
                        <IonText className="ion-text-center ion-padding">
                            <p>No burgers available yet. Check back later!</p>
                        </IonText>
                    )}
                </>
            )}
        </BasePage>
    );
};

export default Home;
