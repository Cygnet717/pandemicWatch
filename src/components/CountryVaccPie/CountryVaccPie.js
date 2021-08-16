import './CountryVaccPie.css';
import React, {Component} from 'react';
import {VictoryPie} from 'victory';
import Footer from '../Footer/Footer';

export default class CountryVaccPie extends Component {
    constructor(props){
        super(props)
        this.state ={
            totalPopulation: 0,
            vaccinationsInitiated: 0,
            vaccinationsCompleted: 0,
            lastUpdated: '',
            error: null,
            isLoaded: false
        }
    }

    formatInitAndComplete(num, pop){
        let formattedNum = Math.round((num/pop)*1000)/10
        return formattedNum
    }

    componentDidMount(){
        fetch(`https://api.covidactnow.org/v2/country/US.json?apiKey=d08cc5e7f23946e38592aebbf91d5dc1`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        totalPopulation: result.population,
                        vaccinationsInitiated: this.formatInitAndComplete(result.actuals.vaccinationsInitiated, result.population),
                        vaccinationsCompleted: this.formatInitAndComplete(result.actuals.vaccinationsCompleted, result.population),
                        lastUpdated: result.lastUpdatedDate,
                        isLoaded: true,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    render(){
        const { error, isLoaded, totalPopulation, vaccinationsInitiated, vaccinationsCompleted,
            lastUpdated }= this.state;

        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div className="loading"> Loading ...</div>;
        } else {
            let vaccInit = vaccinationsInitiated - vaccinationsCompleted; //amt with at least one shot minus the finished ones
            let vaccComp = vaccinationsCompleted; //amt fully vaccinated
            let unvacc = 100 - vaccinationsInitiated;
            let pieData = [
                {x: `Vaccines Initiated (${Math.round(vaccInit*10)/10}%)`, 
                y: Math.round(vaccInit*10)/10},
                {x: `Vaccines Compleeted (${vaccComp}%)`, 
                y: vaccComp,},
                {x: `UnVaccinated (${unvacc}%)`, 
                y: unvacc}
            ];
            return (
                <div>
                    <h2 className='totalVaccTitle'>Total USA Vaccinations</h2>
                    <div className='infoLine'>
                        <div className='info'>Total US Population: {totalPopulation.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}  </div>
                        <div className='info'>Last Updated: {lastUpdated}</div>
                    </div>
                    <div className='pieDiv'>
                    <VictoryPie
                        data={pieData}
                        colorScale={["turquoise", "teal", "black"]}
                        padding={15}
                        height={115}
                        style={{labels: {fontSize: 5}}}
                        labelRadius={55}
                        >

                    </VictoryPie></div>
                    <Footer/>
                </div>
            )
        }
    }
}