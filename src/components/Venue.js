import React, { Component } from 'react'
import 'styles/Venue.css';

export default class Venue extends Component {
    render() {
        return (
            <div className="Venue">
                <a
                  className="Venue-link"
                  href="https://www.hyatt.com/en-US/hotel/maryland/hyatt-regency-chesapeake-bay-golf-resort-spa-and-marina/chesa"
                  target="_blank"
                  rel="noopener noreferrer"
                >HYATT REGENCY CHESAPEAKE BAY
                </a> APRIL 23, 2022
            </div>
        );
    }
}