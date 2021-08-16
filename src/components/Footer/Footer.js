import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
      console.log('rendered')
        return <div className='footer'>
            <a className='footerChunk' href="https://apidocs.covidactnow.org/">API: Covid Act Now</a>
            <a className='footerChunk' href="https://cygnet717.github.io/Portfolio/">Created By: Kathy Bradt</a>
        </div>
    }
}