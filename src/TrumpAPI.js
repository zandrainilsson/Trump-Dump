import React, {Component} from 'react';
import axios from "axios";

class TrumpAPI extends Component {
    state = {
        qoute: "",
        date: "",
    }

    callAPI = () => {
        axios.get('https://www.tronalddump.io/random/quote')
            .then(response => {
            // handle success
                this.setState({
                    quote: response['data']['value'],
                    date: response['data']['appeared_at'].slice(0,10)
                })

            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .then(function () {
            // always executed
        });
    }

    componentDidMount() {
        this.callAPI();
    }
    
    render() {
        const {quote, date} = this.state

        return(
            <div>
                <div id="quote" className="speech-bubble">
                    <p>{quote}</p>
                    <p>{date}</p>
                </div>
                <NewFactButton newFact={this.callAPI} />
            </div>
        )
    }
}

const NewFactButton = props => {
    return(
        <button id="want-more" onClick={props.newFact}>I want more</button>
    )
}

export default TrumpAPI;