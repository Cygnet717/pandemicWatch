import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
    render() {
        return <>
        <nav>
          <Link className="headerLink" to="/pandemicwatch">Home</Link>
          <Link className="headerLink" to="/allstates">All States</Link>
          <Link className="headerLink" to="/singlestate">Single State</Link>
          <Link className="headerLink" to="/countryvaccinations">USA Vaccinations</Link>
        </nav>
        </>
    }
}