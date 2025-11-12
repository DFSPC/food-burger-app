import React from "react";
import {
    IonButton,
    IonCheckbox,
    IonItem,
    IonInput,
    IonList,
    IonText,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel
} from "@ionic/react";
import {
    fastFoodOutline,
    documentTextOutline,
    pricetagOutline,
    imageOutline,
    starOutline
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import BasePage from "../BasePage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForm } from "../hooks/useForm";
import { useValidation } from "../hooks/useValidation";
import {
    CREATE_BURGERS_QUERY,
    UPDATE_BURGER_QUERY
} from "../common/graphql.querys";
import { EMPTY_BURGER } from "../common/consts";
import { Burger, BurgerValidation } from "../types";

interface CreateUpdateProps {
    action: "create" | "update";
    burgerValues: Burger;
    setBurgerValues: React.Dispatch<React.SetStateAction<Burger>>;
    isBurgerValid: BurgerValidation;
    setIsBurgerValid: React.Dispatch<React.SetStateAction<BurgerValidation>>;
    isBurgerTouched: BurgerValidation;
    setIsBurgerTouched: React.Dispatch<React.SetStateAction<BurgerValidation>>;
    getBurgers: () => void;
}

const CreateUpdate: React.FC<CreateUpdateProps> = ({
    action,
    burgerValues,
    setBurgerValues,
    isBurgerValid,
    setIsBurgerValid,
    isBurgerTouched,
    setIsBurgerTouched,
    getBurgers
}) => {
    const history = useHistory();
    const { values, setValues, handleChange } = useForm(burgerValues);

    const [addBurger, { loading: loadingAdd, error: errorAdd }] =
        useMutation(CREATE_BURGERS_QUERY);
    const [editBurger, { loading: loadingEdit, error: errorEdit }] =
        useMutation(UPDATE_BURGER_QUERY);

    const title = action === "create" ? "Create New Burger" : "Edit Burger";
    const buttonLabel = action === "create" ? "Create" : "Update";
    const loading = loadingAdd || loadingEdit;
    const error = errorAdd || errorEdit;

    React.useEffect(() => {
        setValues(burgerValues);
    }, [burgerValues, setValues]);

    const convertBase64 = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const result = fileReader.result as string;
                resolve(result.split(",").pop() || "");
            };
            fileReader.onerror = (error) => reject(error);
        });
    };

    const onFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0];
        if (file) {
            try {
                const base64 = await convertBase64(file);
                setValues((prev) => ({ ...prev, img_blob: base64 }));
                setBurgerValues((prev) => ({ ...prev, img_blob: base64 }));
            } catch (error) {
                console.error("Error converting file:", error);
            }
        }
    };

    const validateInput = (ev: any) => {
        const { name, value, type } = ev.target;
        const isValid =
            type === "number"
                ? !isNaN(parseFloat(value)) && value !== ""
                : value.trim().length > 0;

        setIsBurgerValid((prev) => ({ ...prev, [name]: isValid }));
    };

    const handleInputChangeLocal = (ev: any) => {
        handleChange(ev);
        setBurgerValues((prev: any) => {
            const { name, value, type } = ev.target;
            return {
                ...prev,
                [name]: type === "number" ? parseFloat(value) || "" : value
            };
        });
    };

    const createUpdateBurger = async () => {
        try {
            let data;
            if (action === "create") {
                const result = await addBurger({ variables: values });
                data = result.data;
            } else {
                const result = await editBurger({ variables: values });
                data = result.data;
            }

            if (data?.createProduct?._id || data?.updateProduct?._id) {
                setBurgerValues(EMPTY_BURGER);
                getBurgers();
                history.push("/home");
            }
        } catch (err) {
            console.error("Error saving burger:", err);
        }
    };

    const isFormValid =
        isBurgerValid.title && isBurgerValid.description && isBurgerValid.price;

    return (
        <BasePage title={title} footer="">
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className="ion-text-center">
                        <IonIcon icon={fastFoodOutline} size="large" />
                        <h2>{title}</h2>
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {error && (
                        <IonText color="danger">
                            <p className="ion-text-center">{error.message}</p>
                        </IonText>
                    )}

                    {loading ? (
                        <LoadingSpinner
                            message={`${
                                action === "create" ? "Creating" : "Updating"
                            }...`}
                        />
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (isFormValid) createUpdateBurger();
                            }}
                        >
                            <IonList>
                                <IonItem>
                                    <IonIcon
                                        icon={fastFoodOutline}
                                        slot="start"
                                    />
                                    <IonInput
                                        value={values.title}
                                        onIonInput={(ev) => {
                                            handleInputChangeLocal(ev);
                                            validateInput(ev);
                                        }}
                                        name="title"
                                        label="Burger Name"
                                        labelPlacement="floating"
                                        className={`${
                                            isBurgerValid.title && "ion-valid"
                                        } ${
                                            isBurgerValid.title === false &&
                                            "ion-invalid"
                                        } ${
                                            isBurgerTouched.title &&
                                            "ion-touched"
                                        }`}
                                        errorText="Please enter a burger name"
                                        onIonBlur={() =>
                                            setIsBurgerTouched((prev) => ({
                                                ...prev,
                                                title: true
                                            }))
                                        }
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonIcon
                                        icon={documentTextOutline}
                                        slot="start"
                                    />
                                    <IonInput
                                        value={values.description}
                                        onIonInput={(ev) => {
                                            handleInputChangeLocal(ev);
                                            validateInput(ev);
                                        }}
                                        name="description"
                                        label="Description"
                                        labelPlacement="floating"
                                        className={`${
                                            isBurgerValid.description &&
                                            "ion-valid"
                                        } ${
                                            isBurgerValid.description ===
                                                false && "ion-invalid"
                                        } ${
                                            isBurgerTouched.description &&
                                            "ion-touched"
                                        }`}
                                        errorText="Please enter a description"
                                        onIonBlur={() =>
                                            setIsBurgerTouched((prev) => ({
                                                ...prev,
                                                description: true
                                            }))
                                        }
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonIcon
                                        icon={pricetagOutline}
                                        slot="start"
                                    />
                                    <IonInput
                                        value={values.price}
                                        onIonInput={(ev) => {
                                            handleInputChangeLocal(ev);
                                            validateInput(ev);
                                        }}
                                        name="price"
                                        label="Price"
                                        labelPlacement="floating"
                                        type="number"
                                        className={`${
                                            isBurgerValid.price && "ion-valid"
                                        } ${
                                            isBurgerValid.price === false &&
                                            "ion-invalid"
                                        } ${
                                            isBurgerTouched.price &&
                                            "ion-touched"
                                        }`}
                                        errorText="Please enter a valid price"
                                        onIonBlur={() =>
                                            setIsBurgerTouched((prev) => ({
                                                ...prev,
                                                price: true
                                            }))
                                        }
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={starOutline} slot="start" />
                                    <IonCheckbox
                                        onIonChange={(e) => {
                                            const ev = {
                                                target: {
                                                    name: "featured",
                                                    checked: e.detail.checked,
                                                    value: e.detail.checked
                                                }
                                            };
                                            handleInputChangeLocal(ev);
                                        }}
                                        name="featured"
                                        checked={values.featured}
                                    >
                                        <IonLabel>Featured Item</IonLabel>
                                    </IonCheckbox>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={imageOutline} slot="start" />
                                    <IonLabel>Image</IonLabel>
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={onFileChange}
                                        style={{ padding: "10px 0" }}
                                    />
                                </IonItem>
                            </IonList>

                            <IonButton
                                disabled={!isFormValid}
                                type="submit"
                                color="primary"
                                expand="block"
                                className="ion-margin-top"
                            >
                                {buttonLabel}
                            </IonButton>
                        </form>
                    )}
                </IonCardContent>
            </IonCard>
        </BasePage>
    );
};

export default CreateUpdate;
