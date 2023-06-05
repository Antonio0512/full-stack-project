import {useState} from "react";

export const useForm = (onSubmitHandler, initialValues = {}) => {
    const [values, setValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        const {name, value, type, checked} = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setValues(
            state => ({...state, [name]: newValue})
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler();
    };

    return {
        onSubmit,
        onChangeHandler,
        values
    };
};