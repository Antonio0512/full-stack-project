import {Header} from "./components/common/Header";
import {Homepage} from "./components/Homepage/Homepage";
import {Footer} from "./components/common/Footer";
import {Route, Routes} from "react-router-dom";
import {Register} from "./components/Register/Register";
import {AuthProvider} from "./contexts/AuthContext";
import {Login} from "./components/Login/Login";

function App() {
    return (
        <AuthProvider>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </main>
            <Footer/>
        </AuthProvider>
    )
}

export default App;