import { FC, ComponentPropsWithoutRef } from 'react';
import s from './TextArea.module.scss';

interface ITextArea extends ComponentPropsWithoutRef<'textarea'> {
    label?: string;
    errorMessage?: string;
    initialValue?: string;
}

const TextArea: FC<ITextArea> = ({ label, errorMessage, initialValue = '', ...props }) => {
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
            <textarea {...props} defaultValue={initialValue} className={getInputClassName()} />
            {errorMessage && <span>{errorMessage}</span>}
        </div>
    );
};

export default TextArea;
