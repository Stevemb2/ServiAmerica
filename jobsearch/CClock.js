import React, { Component } from 'react';

class CClock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: new Date()
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({time: new Date()});
        }, 1000);
    }

    render() {
        return (
            <span>Current Time: {this.state.time.toLocaleTimeString()}</span>
        )
    }
};

export default CClock;
