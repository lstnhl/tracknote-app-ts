import React, { FC, ComponentPropsWithoutRef } from 'react';
import s from './Text.module.scss';

interface IText extends ComponentPropsWithoutRef<'input'> {
    label?: string;
    errorMessage?: string;
}

const Text: FC<IText> = ({ label, errorMessage, ...props }) => {
    const getInputClassName = (): string => {
        let className = `${s.input}`;

        if (props.className) {
            className = className + ` ${props.className}`;
        }

        if (errorMessage) {
            className = className + ` ${s.error}`;
        }

        return className;
    };

    return (
        <div className={s.container}>
            <label>
                {label + ':'}
            </label>
            <input {...props} className={getInputClassName()} />
            {errorMessage && <span>{errorMessage}</span>}
        </div>
    );
};

export default Text;
