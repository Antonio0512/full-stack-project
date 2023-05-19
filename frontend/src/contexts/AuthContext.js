import {createContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/authService"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const navigate = useNavigate();

    const onRegisterSubmit = async (data) => {
        try {
            const result = await authService.register(data);
            setAuth(result);

            navigate("/");
        } catch (err) {
            throw new Error(err)
        }
    };

    const onLoginSubmit = async (data) => {
        console.log(data)
        try {
            const result = await authService.login(data);
            setAuth(result);

            navigate("/");
        } catch (err) {
            throw new Error(err)
        }
    };

    const authContextData = {
        onRegisterSubmit,
        onLoginSubmit,
        token: auth.accessToken,
        userId: auth._id,
        isAuthenticated: !!auth.accessToken
    };

    return (
        <>
            <AuthContext.Provider value={authContextData}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
