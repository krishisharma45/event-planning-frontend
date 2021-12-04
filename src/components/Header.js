import 'styles/Header.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import React, { Component } from 'react'
import refreshPage from 'utils/refreshPage';

export default class Header extends Component {
    render() {
        return (
            <div onClick={refreshPage} className="Header">
                <div className="Header-names">
                    <Router>
                        <Link exact to="/" className="Header-text">luv <span className="Header-and">&</span> krishi</Link>
                    </Router>
                </div>
            </div>
            );
    }

}