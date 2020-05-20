import React, {Component} from 'react';
import TrumpAPI from './TrumpAPI';

class TrumpDumpApp extends Component {
    render() {
        return (
            <div id="container">
                <header>
                    <h1>Trump Dump</h1>
                </header>
                <TrumpAPI />
            </div>
        )
    }
}

export default TrumpDumpApp;