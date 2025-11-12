import { useState, ChangeEvent } from "react";

interface UseFormReturn<T> {
    values: T;
    setValues: React.Dispatch<React.SetStateAction<T>>;
    handleChange: (ev: any) => void;
    resetForm: () => void;
}

export function useForm<T>(initialValues: T): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (ev: any) => {
        const { name, value, checked, type } = ev.target;
        let sendValue: any;

        if (checked === true || checked === false) {
            sendValue = checked;
        } else if (type === "number") {
            sendValue = parseFloat(value) || "";
        } else {
            sendValue = value;
        }

        setValues((previousValues) => ({
            ...previousValues,
            [name]: sendValue
        }));
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return { values, setValues, handleChange, resetForm };
}
