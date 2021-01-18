import React, { Component } from 'react';
import CClock from "./CClock";

class ClockWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            change: true
        };
    }

    render() {
        return (
            <div>
                <button onClick = {() => {
                    this.setState({
                        change: !this.state.change
                    })
                }}>Toggle Clock</button>
                <br/>
                {this.state.change ? <CClock />: null}
            </div>
        );
    }
}

export default ClockWrapper;
