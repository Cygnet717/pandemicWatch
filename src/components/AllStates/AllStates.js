import React, {Component} from 'react';
import './AllStates.css';

export default class AllStates extends Component{
    constructor(props) {
        super(props);
        this.state ={
            error: null,
            isLoaded: false,
            stateData: [],
        };
    }

    componentDidMount() {
        fetch('https://api.covidactnow.org/v2/states.json?apiKey=d08cc5e7f23946e38592aebbf91d5dc1')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        stateData: result
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

    render () {
        const { error, isLoaded, stateData } = this.state;
        
        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div> Loading ...</div>;
        } else {
            return(
                <table className='allStatesTable'>
                    <thead>
                        <tr>
                            <th>State</th>
                            <th>Population</th>
                            <th>New Cases</th>
                            <th>Vaccines Initiated</th>
                            <th>% of Population Vaccinated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateData.map(st => {
                            return(
                                <tr key={st.locationId}>
                                    <td>{st.state}</td>
                                    <td>{st.population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{st.actuals.newCases.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{typeof st.actuals.vaccinationsInitiated === 'number'? st.actuals.vaccinationsInitiated.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","): 'No Data'}</td>
                                    <td>{Math.round((st.actuals.vaccinationsInitiated/st.population)*100)+'%'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        }
    }
}