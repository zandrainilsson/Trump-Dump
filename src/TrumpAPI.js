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
            <div id="quote">
                <p>{quote}</p>
                <p>{date}</p>
                <NewFactButton newFact={this.callAPI} quote={quote}/>
            </div>
        )
    }
}

const NewFactButton = props => {
    console.log(props.quote)
    return(
        <button id="want-more" onClick={props.newFact}>I want more</button>
    )
}

export default TrumpAPI;