import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import {MusicProvider} from './contexts/MusicContext';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import {Homepage} from './components/Homepage/Homepage';
import {Register} from './components/Register/Register';
import {Login} from './components/Login/Login';
import {Logout} from './components/Logout/Logout';
import {Profile} from './components/Profile/ProfileDetails/Profile';
import {EditProfile} from './components/Profile/EditProfile/EditProfile';
import {DeleteProfile} from './components/Profile/DeleteProfile/DeleteProfile';
import {SongCreate} from './components/Music/SongCreate/SongCreate';
import {SongCatalog} from './components/Music/SongCatalog/SongCatalog';
import {SongDetails} from './components/Music/SongDetails/SongDetails';
import {SongEdit} from './components/Music/SongEdit/SongEdit';
import {SongDelete} from './components/Music/SongDelete/SongDelete';
import {RouteGuard} from "./protectedRoutes/RouteGuard";

function App() {
    return (
        <AuthProvider>
            <MusicProvider>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/logout" element={<Logout/>}/>

                        {/* Protected routes */}
                        <Route element={<RouteGuard/>}>
                            <Route path="/profile/" element={<Profile/>}/>
                            <Route path="/profile-edit/" element={<EditProfile/>}/>
                            <Route path="/profile-delete/" element={<DeleteProfile/>}/>
                            <Route path="/song-add/" element={<SongCreate/>}/>
                            <Route path="/song-catalog/" element={<SongCatalog/>}/>
                            <Route path="/song-catalog/song-details/:songId/" element={<SongDetails/>}/>
                            <Route path="/song-catalog/song-edit/:songId/" element={<SongEdit/>}/>
                            <Route path="/song-catalog/song-delete/:songId/" element={<SongDelete/>}/>
                        </Route>
                    </Routes>
                </main>
                <Footer/>
            </MusicProvider>
        </AuthProvider>
    )
        ;
}

export default App;
