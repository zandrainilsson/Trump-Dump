import React, { useState, useEffect } from 'react';
import { useTransition, useSpring, animated } from 'react-spring';
import axios from "axios";


export default function TrumpDumpApp() {
    const [trumpState, setTrump] = useState({
        quote: "",
        gif: "",
    })

    const pages = [
        ({ style }) => <animated.div className="speech-bubble" style={{ ...style, background: 'white' }}>{trumpState.quote}</animated.div>,
    ]

    const [index] = useState(0)

    async function apiCall() {
        let trumpTweet = await axios.get('https://www.tronalddump.io/random/quote');
        trumpTweet = trumpTweet.data.value;

        let trumpGif = await axios.get('http://api.giphy.com/v1/gifs/random', {
            params: {
                api_key: 'hE1CoGoRCHBeKLfdZoOZIb1YfP32zYKQ',
                tag: "donald trump"
            }
          });
        trumpGif = trumpGif.data.data.id;

        setTrump({
            quote: trumpTweet,
            gif: "https://media.giphy.com/media/" + trumpGif + "/giphy.gif",
        });
    }
    
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

    const TrumpGif = () => {
        return (
            <div id="trump-gif">
                <img src={trumpState.gif} />
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

const Welcome = () => {
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    })
    return <animated.h1 style={props}>Trump Dump</animated.h1>
}

const NewFactButton = (props) => {
    return(
        <button id="want-more" onClick={props.apiCall}>I want more</button>
    )
}

