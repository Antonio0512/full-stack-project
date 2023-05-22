import {Header} from "./components/common/Header";
import {Homepage} from "./components/Homepage/Homepage";
import {Footer} from "./components/common/Footer";
import {Route, Routes} from "react-router-dom";
import {Register} from "./components/Register/Register";
import {AuthProvider} from "./contexts/AuthContext";
import {Login} from "./components/Login/Login";
import {Logout} from "./components/Logout/Logout";
import {Profile} from "./components/Profile/Profile";
import {EditProfile} from "./components/EditProfile/EditProfile";
import {DeleteProfile} from "./components/DeleteProfile/DeleteProfile";

function App() {
    return (
        <AuthProvider>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/profile-edit" element={<EditProfile/>}/>
                    <Route path="/profile-delete" element={<DeleteProfile/>}/>
                </Routes>
            </main>
            <Footer/>
        </AuthProvider>
    )
}

export default App;