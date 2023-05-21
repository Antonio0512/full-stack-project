import {createContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/authService"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const navigate = useNavigate();
    // const parsedLocalStorage = JSON.parse(localStorage.auth)

    const onRegisterSubmit = async (data) => {
        try {
            const response = await authService.register(data);

            setAuth(response)
            navigate("/");
        } catch (err) {
            throw new Error(err)
        }
    };

    const onLoginSubmit = async (data) => {
        try {
            const response = await authService.login(data);
            setAuth(response);
            navigate("/");
        } catch (err) {
            throw new Error(err)
        }
    };

    const onLogoutSubmit = () => {
        setAuth("auth", {})
        navigate('/')
    }

    const authContextData = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogoutSubmit,
        token: auth?.access_token,
        userId: auth?.user?.id,
        email: auth?.user?.email,
        username: auth?.user?.username,
        firstName: auth?.user?.first_name,
        lastName: auth?.user?.last_name,
        isAuthenticated: !!auth.access_token
    };

    return (
        <>
            <AuthContext.Provider value={authContextData}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
