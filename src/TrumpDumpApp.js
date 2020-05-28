import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from "axios";


export default function TrumpDumpApp() {
    const [trumpState, setTrump] = useState({
        quote: "",
        date: "",
    })

    const [trumpGif, setGif] = useState("");

    function apiCall() {

        axios.get('https://www.tronalddump.io/random/quote')
            .then(response => {
                let quote = response['data']['value'];
                let date = response['data']['appeared_at'].slice(0,10);

                setTrump({ quote: quote, date: date }); 
        });

        axios.get('http://api.giphy.com/v1/gifs/random', {
            params: {
                api_key: 'hE1CoGoRCHBeKLfdZoOZIb1YfP32zYKQ',
                tag: "donald trump"
            }
          })
          .then(function (response) {
            setGif("https://media.giphy.com/media/"+response.data.data.id+"/giphy.gif");
          });
    }

    useEffect(() => {
        apiCall();
    }, []);

    return(
        <div id="container">
            <header>
                <Welcome/>
            </header>

            <ApiDiv info={trumpState} />
            <img src={trumpGif} alt="gif of trump" />
            <NewFactButton newFact={apiCall} />
        </div>
    )
}

const ApiDiv = (props) => {
    return (
        <div className="speech-bubble">
            <p>{props.info.quote}</p>
            <p>{props.info.date}</p>
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

const NewFactButton = props => {
    return(
    <button id="want-more" onClick={props.newFact}>I want more</button>
    )
}
