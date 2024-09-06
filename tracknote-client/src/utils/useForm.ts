import { FC, useState, useEffect, useMemo } from 'react';

interface IStateBase {
    name: string;
    label: string;
    hidden: boolean;
}

interface IFormValidators {
    notNull?: boolean;
    minLength?: number;
    maxLength?: number;
}

interface IFormElement extends IStateBase {
    validators: IFormValidators;
}

interface IStateElement extends IStateBase {
    value: string;
    errorMessage: string;
}

function useForm(formData: IFormElement[]) {
    const initialState: IStateElement[] = useMemo(() => {
        return formData.map((el) => ({
            name: el.name,
            label: el.label,
            hidden: el.hidden,
            errorMessage: '',
            value: '',
        }));
    }, [formData]);

    const [data, setData] = useState<IStateElement[]>(initialState);

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const elemIndex = data.findIndex((el) => el.name === e.target.name);
        const dataCopy = [...data];
        dataCopy[elemIndex].value = e.target.value;
        setData(dataCopy);
    };

    const changeErrorMessage = (name: string, message: string) => {
        const elemIndex = data.findIndex((el) => el.name === name);
        const dataCopy = [...data];
        dataCopy[elemIndex].errorMessage = message;
        setData(dataCopy);
    };

    const validate = (onSuccess: () => void) => {
        data.forEach((currentForm) => {
            const validators = formData.find(
                (elem) => currentForm.name === elem.name,
            )?.validators;

            if (!validators) {
                return;
            }

            const entries = Object.entries(validators);
            let errorMsg = '';

            entries.forEach((validator) => {
                switch (validator[0]) {
                    case 'notNull':
                        if (!notNull(currentForm.value)) {
                            errorMsg += 'не может быть пустым / ';
                        }
                        break;

                    case 'minLength':
                        if (!minLength(currentForm.value, validator[1])) {
                            errorMsg += `не может быть короче ${validator[1]} символов / `;
                        }
                        break;
                    case 'maxLength':
                        if (!maxLength(currentForm.value, validator[1])) {
                            errorMsg += `не может быть длиннее ${validator[1]} символов / `;
                        }
                        break;
                }
            });

            changeErrorMessage(currentForm.name, errorMsg);
            if (!errorMsg) {
                onSuccess();
            }
        });
    };

    return { data, changeValue, validate };
}

function notNull(str: string) {
    return str.length !== 0;
}

function minLength(str: string, len: number) {
    return str.length >= len;
}

function maxLength(str: string, len: number) {
    return str.length <= len;
}

export default useForm;
