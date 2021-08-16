import React, {Component} from 'react';
import './LandingPage.css';
import poster from './videoPoster.png';
import maskingVideo from './maskingVideo.mp4';
import Footer from '../Footer/Footer';

export default class LandingPage extends Component {
    

    render() {
        let viewPortWidth = window.innerWidth;
        return(
            <div>
                <div className='mainBox'>
                    <div className='videoBox'>
                        <video 
                            className='video' 
                            width={viewPortWidth <= 400? 500: 
                                viewPortWidth <= 1000? viewPortWidth: 1000} 
                            poster={poster} controls autoPlay loop muted
                        >
                            <source src={maskingVideo} type='video/mp4'/>
                        </video>
                    </div>
                    <div className='contentBox'>
                        <h1>Pandemic Watch</h1>
                        <p className='landingText'>Get caught up on how our pandemic response is shaping up.  View stats on individual states vaccination, death, and new case rates.  Explore a graph of your states new case numbers each day across the entire pandemic.</p>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
