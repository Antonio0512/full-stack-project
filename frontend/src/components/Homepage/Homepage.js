import "./homepage.css"
import {useContext, useEffect, useState} from "react";
import {MusicContext} from "../../contexts/MusicContext";


export const Homepage = () => {
    const {songs} = useContext(MusicContext)
    const [bestSongs, setBestSongs] = useState([])

    useEffect(() => {
    setBestSongs(songs => {
        const sortedSongs = songs.sort((a, b) => b.likes - a.likes);
        const topThreeSongs = sortedSongs.slice(0, 3);
        setBestSongs(topThreeSongs);
    });
    }, []);


    return (
        <main>
            <section className="hero">
                <h2>Welcome to Music App</h2>
                <p>Join our community of music lovers.</p>
            </section>

            <section className="features">
                <div className="feature">
                    <img src="" alt="Feature 1"/>
                    <h3>Themed Rooms</h3>
                    <p>Choose from a variety of themed rooms, including rock, jazz, classical, and more.</p>
                </div>
            </section>
        </main>
    )
}