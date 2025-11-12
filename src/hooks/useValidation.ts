import { useState } from 'react';
import {
  validateEmail,
  validatePassword,
  validateText,
  validateNumber,
} from '../common/validate';

interface UseValidationReturn<T> {
  isValid: T;
  setIsValid: React.Dispatch<React.SetStateAction<T>>;
  isTouched: T;
  setIsTouched: React.Dispatch<React.SetStateAction<T>>;
  validateInput: (ev: any) => void;
  markAsTouched: (name: string) => void;
}

export function useValidation<T extends Record<string, boolean>>(
  initialValidState: T,
  initialTouchedState: T
): UseValidationReturn<T> {
  const [isValid, setIsValid] = useState<T>(initialValidState);
  const [isTouched, setIsTouched] = useState<T>(initialTouchedState);

  const validateInput = (ev: any) => {
    const { name, value, type } = ev.target;
    let validInput: boolean;

    switch (type) {
      case 'email':
        validInput = validateEmail(value);
        break;
      case 'password':
        validInput = validatePassword(value);
        break;
      case 'number':
        validInput = validateNumber(value);
        break;
      case 'text':
      default:
        validInput = validateText(value);
        break;
    }

    setIsValid((previousValues) => ({
      ...previousValues,
      [name]: validInput,
    }));
  };

  const markAsTouched = (name: string) => {
    setIsTouched((previousValues) => ({
      ...previousValues,
      [name]: true,
    }));
  };

  return { isValid, setIsValid, isTouched, setIsTouched, validateInput, markAsTouched };
}
