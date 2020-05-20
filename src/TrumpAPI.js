import React, {Component} from 'react';

class TrumpAPI extends Component {
    state = {
        qoute: "",
        date: "",
    }

    callAPI = () => {
        const axios = require('axios').default;

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
            </div>
        )
    }
}

export default TrumpAPI;