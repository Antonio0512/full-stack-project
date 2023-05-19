import {useState} from "react";

export const useForm = (onSubmitHandler, initialValues) => {
    const [values, setValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        setValues(
            state => ({...state, [e.target.name]: e.target.value})
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler();
        setValues(initialValues);
    };

    return {
        onSubmit,
        onChangeHandler,
        values
    };
};