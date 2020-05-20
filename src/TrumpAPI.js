import React, {Component} from 'react';

class TrumpAPI extends Component {
    state = {
        qoute: "",
    }

    callAPI = () => {
        const axios = require('axios').default;

        axios.get('https://www.tronalddump.io/random/quote')
            .then(response => {
            // handle success
                this.setState({
                    quote: response['data']['value']
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
        const {quote} = this.state

        return <p>{quote}</p>
    }
}

export default TrumpAPI;