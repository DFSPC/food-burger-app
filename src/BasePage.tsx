import {
    IonLabel,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter
} from "@ionic/react";
import { PropsWithChildren, ReactNode } from "react";

type TitleFooterProps = {
    title: string;
    footer: string;
};

const BasePage: React.FC<{
    title: string;
    footer: string;
    children?: ReactNode;
}> = (props: PropsWithChildren<TitleFooterProps>) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="ion-text-center">
                    <IonTitle>{props.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">{props.children}</IonContent>
            {props.footer ? (
                <IonFooter>
                    <IonToolbar className="ion-text-center">
                        <IonLabel>{props.footer}</IonLabel>
                    </IonToolbar>
                </IonFooter>
            ) : (
                <></>
            )}
        </IonPage>
    );
};

export default BasePage;
