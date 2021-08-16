import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
      console.log('rendered')
        return <div className='footer'>
            <div className='footerChunk'>API: <a className='footerLink' href="https://apidocs.covidactnow.org/">Covid Act Now</a></div>
            <div className='footerChunk'>Created By: <a className='footerLink' href="https://cygnet717.github.io/Portfolio/">Kathy Bradt</a></div>
        </div>
    }
}