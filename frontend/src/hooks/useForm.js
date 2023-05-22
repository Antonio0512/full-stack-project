import {useState} from "react";

export const useForm = (onSubmitHandler, initialValues = {}) => {
    const [values, setValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setValues(
            state => ({...state, [name]: value})
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