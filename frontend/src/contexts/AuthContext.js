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
            const response = await authService.register(data);
            const {access_token, user} = response;

            setAuth({
                access_token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    age: user.age,
                    bio: user.bio,
                    profile_picture: user.profile_picture
                }
            });

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
        setAuth({})
        navigate('/')
    }

    const onProfileEdit = async (data, userId) => {
        try {
            const response = await authService.profileEdit(data, userId);
            setAuth(response);

            navigate('/profile');
        } catch (err) {
            throw new Error()
        }
    };

    const authContextData = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogoutSubmit,
        onProfileEdit,
        token: auth?.access_token,
        userId: auth?.user?.id,
        email: auth?.user?.email,
        username: auth?.user?.username,
        firstName: auth?.user?.first_name,
        lastName: auth?.user?.last_name,
        age: auth?.user?.age,
        bio: auth?.user?.bio,
        profilePicture: auth?.user?.profile_picture,
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
