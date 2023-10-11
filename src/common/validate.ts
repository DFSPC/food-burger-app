export const validateEmail = (email: string) => {
    return (
        email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ) != null
    );
};

export const validatePassword = (password: string) => {
    return password.length > 0;
};

export const validateText = (text: string) => {
    return text.length > 5;
};

export const validateNumber = (number: string) => {
    return /^[0-9]*$/.test(number) && number.length > 0;
};
