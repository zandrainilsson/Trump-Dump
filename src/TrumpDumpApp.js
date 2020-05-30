import React, { useState, useEffect } from 'react';
import { useTransition, useSpring, animated } from 'react-spring';
import axios from "axios";

/** Funktionen som kör hela webbapplikationen */
export default function TrumpDumpApp() {
    const [trumpState, setTrump] = useState({
        quote: "",
        gif: "",
    })

    /** Hook för animering */
    const [index] = useState(0)

    /** Lista med html-element för rendering av animering */
    const pages = [
        ({ style }) => <animated.div className="speech-bubble" style={{ ...style, background: 'white' }}>{trumpState.quote}</animated.div>,
    ]

    /** Funktion som anropar två olika APIer*/
    async function apiCall() {
        let trumpTweet = await axios.get('https://www.tronalddump.io/random/quote');
        trumpTweet = trumpTweet.data.value;

        let trumpGifList = await axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
                api_key: 'hE1CoGoRCHBeKLfdZoOZIb1YfP32zYKQ',
                q: "trump",
                limit: 20,
            }
          });

        /** Väljer ut en GIF från svaret i 'trumpGifList' */
        trumpGifList = trumpGifList.data.data;
        let randomGif= trumpGifList[Math.floor(Math.random()*trumpGifList.length)];
        randomGif = randomGif.id;

        /** Sätter hooken 'trumpState' med 'trumpTweet' och 'randomGif' */
        setTrump({
            quote: trumpTweet,
            gif: "https://media.giphy.com/media/" + randomGif + "/giphy.gif",
        });
    }
    
    /** Funktion som animerar och returnerar html-element 'div' med innehållet i variabeln 'pages' */
    const TrumpText = () => {
        const transitions = useTransition(index, p => p, {
            from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
            enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
            leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
        })
        return (
            <div className="simple-trans-main">
                {transitions.map(({ item, props, key }) => {
                    const Page = pages[item]
                    return <Page key={key} style={props} />
                })}
            </div>
        )
    }

    /** Funktion som returnerar en div vilken innehåller en bild med GIF, sparad id 'trumpState' */
    const TrumpGif = () => {
        return (
            <div id="trump-gif">
                <img src={trumpState.gif} alt="gif of donald trump"/>
            </div>
        )
    }

    useEffect(() => {
        apiCall();
    }, []);


    return(
        <div id="container">
            <header>
                <Welcome/>
            </header>
            <main>
                <TrumpGif />
                <TrumpText />
            </main>
            <NewFactButton apiCall={apiCall}/>
        </div>
    )
}

/** Funktion som returerar ett animerat <h1>-element */
const Welcome = () => {
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    })
    return <animated.h1 style={props}>Trump Dump</animated.h1>
}

/** Funktion som returnerar <button> vilken genererar nytt API-anrop */
const NewFactButton = (props) => {
    return(
        <button id="want-more" onClick={props.apiCall}>I want more</button>
    )
}

