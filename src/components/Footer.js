import 'styles/Footer.css';
import React, { Component, Fragment } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className="Footer">
                    <div className="Footer-text">
                        made with <span className="Footer-luv">luv</span> by krishi
                    </div>
                </div>
            </Fragment>
            );
    }
}