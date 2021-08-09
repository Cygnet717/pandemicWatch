import './SingleStateGraph.css';
import React, {Component} from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryZoomContainer, VictoryLabel } from 'victory';


export default class SingleStateGraph extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error: this.props.error,
            isLoaded: this.props.isLoaded,
        };
    }  


    handleZoom(domain){
        this.setState({selectedDomain: domain});
    }

    render() {
    console.log(this.props)

        if(this.state.error){
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded){
            return <div> Loading ...</div>;
        } else {
            let viewPortWidth = window.innerWidth;
            return (
                <div className='fullGraph'>
                    <div className='stateGraphHeader'>
                        <h3>Historical Daily New Cases for {this.props.selectedState}</h3>
                        <div className='totalDeaths'>{this.props.totalDeaths} total deaths in {this.props.selectedState}</div>
                    </div>
                    <VictoryChart 
                        width={viewPortWidth <= 1000? viewPortWidth: 1000}
                        height={300}
                        scale={{x:"time"}}
                        theme={VictoryTheme.material}
                        domainPadding={30}
                        containerComponent={
                            <VictoryZoomContainer 
                                responsive={false} 
                                zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={this.handleZoom.bind(this)}
                            />
                            
                        }
                    >
                        <VictoryAxis
                            tickCount={8}
                            style={{grid: {stroke: "gray"}}}
                            tickFormat={((x) => new Date(x).toDateString().slice(4, 11))}
                            />
                        <VictoryAxis
                            dependentAxis
                            style={{grid: {stroke: "gray"}}}
                            axisLabelComponent={<VictoryLabel dy={-35}/>}
                            label="New Cases"
                            offsetX={55}
                            />
                        <VictoryLine
                            style={{data: {stroke:"tomato"}}}
                            data={this.props.timeSeriesData}
                            x="date"
                            y="newCases"
                        />
                    </VictoryChart>
                </div>
            )
        }
    }
}