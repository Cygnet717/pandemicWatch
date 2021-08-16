import React, {Component} from 'react';
import SingleStateGraph from './SingleStateGraph/SingleStateGraph.js';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../Footer/Footer';
import './SingleState.css';

export default class SingleState extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state ={
            stateValue: 'default',
            stateName: 'default',
            showStateGraph: false,
            error: null,
            isLoaded: false,
            timeSeriesData: [],
            totalDeaths: 0
        }
    }

    listStates=[{state: 'Alabama', abv: 'AL'}, {state: 'Alaska', abv: 'AK'}, {state: 'Arizona', abv: 'AZ'}, {state: 'Arkansas', abv: 'AR'}, {state: 'California', abv: 'CA'}, {state: 'Colorado', abv: 'CO'}, {state: 'Connecticut', abv: 'CT'}, {state: 'Delaware', abv: 'DE'}, {state: 'Florida', abv: 'FL'}, {state: 'Georgia', abv: 'GA'}, {state: 'Hawaii', abv: 'HI'}, {state: 'Idaho', abv: 'ID'}, {state: 'Illinois', abv: 'IL'}, {state: 'Indiana', abv: 'IN'}, {state: 'Iowa', abv: 'IA'}, {state: 'Kansas', abv: 'KS'}, {state: 'Kentucky', abv: 'KY'}, {state: 'Louisiana', abv: 'LA'}, {state: 'Maine', abv: 'ME'}, {state: 'Maryland', abv: 'MD'}, {state: 'Massachusetts', abv: 'MA'}, {state: 'Michigan', abv: 'MI'}, {state: 'Minnesota', abv: 'MN'}, {state: 'Mississippi', abv: 'MS'}, {state: 'Missouri', abv: 'MO'}, {state: 'Montana', abv: 'MT'}, {state: 'Nebraska', abv: 'NE'}, {state: 'Nevada', abv: 'NV'}, {state: 'New Hampshire', abv: 'NH'}, {state: 'New Jersey', abv: 'NJ'}, {state: 'New Mexico', abv: 'NM'}, {state: 'New York', abv: 'NY'}, {state: 'North Carolina', abv: 'NC'}, {state: 'North Dakota', abv: 'ND'}, {state: 'Ohio', abv: 'OH'}, {state: 'Oklahoma', abv: 'OK'}, {state: 'Oregon', abv: 'OR'}, {state: 'Pennsylvania', abv: 'PA'}, {state: 'Rhode Island', abv: 'RI'}, {state: 'South Carolina', abv: 'SC'}, {state: 'South Dakota', abv: 'SD'}, {state: 'Tennessee', abv: 'TN'}, {state: 'Texas', abv: 'TX'}, {state: 'Utah', abv: 'UT'}, {state: 'Vermont', abv: 'VT'}, {state: 'Virginia', abv: 'VA'}, {state: 'Washington', abv: 'WA'}, {state: 'West Virginia', abv: 'WV'}, {state: 'Wisconsin', abv: 'WI'}, {state: 'Wyoming', abv: 'WY'}]

    handleSubmit=(event)=> {
        event.preventDefault();
        const data = new FormData(event.target);
        for(let i=0; i<this.listStates.length; i++){
            if(data.get('state') === this.listStates[i].abv){
                this.setState({stateName: this.listStates[i].state})
            }
        };

        this.SearchSingleStateData(data.get('state'));
    }

    handleChange = (event)=>{
        this.setState({stateValue: event.target.value})
    }
   
    SearchSingleStateData(state) {
        fetch(`https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=d08cc5e7f23946e38592aebbf91d5dc1`)
            .then(res => res.json())
            .then(
                (result) => {
                    
                    this.setState({
                        showStateGraph: true,
                        isLoaded: true,
                        timeSeriesData: result.actualsTimeseries,
                        totalDeaths: result.actuals.deaths,
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
    render() {
        const { stateValue, timeSeriesData, stateName, totalDeaths, showStateGraph, error, isLoaded } =this.state;
        return(
            <div className='mainDiv'>
                <div className='description'>Select your State to get daily new case numbers since the beginning of the pandemic</div>
                <form className='stateSelectionForm' onSubmit={this.handleSubmit}>
                    <div className='form_dropdowns'>
                        <label htmlFor='state'>State</label>
                        <select name='state' id='state' value={stateValue} onChange={this.handleChange}>
                            <option vlaue='default'>Select a State</option>
                            {this.listStates.map(i => {
                                return <option id={i.state} name='state' key={uuidv4()} value={i.abv} >{i.state}</option>
                            })}
                        </select>
                    </div>
                    <input className='submitBtn' type='submit' value='Gather Data'/>
                </form>
                <div className='graphBox'>
                    {showStateGraph? 
                        <SingleStateGraph 
                            timeSeriesData={timeSeriesData} 
                            totalDeaths={totalDeaths}
                            selectedState={stateName}
                            error={error}
                            isLoaded={isLoaded}
                        />: <div></div>}
                </div>
                <Footer/>
            </div>
        )
    }
}