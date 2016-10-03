/**
 * Created by Tejaswaroop on 10/2/16.
 */


import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class PieChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            chartLabels: [],
            chartValues: []
        };
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.chartLabels.length !== 0) {
            this.setState({ chartLabels: nextProps.chartLabels });
            this.setState({ chartValues: nextProps.chartValues });
        }
    }
    render(){
        let PieChart = '';
        if (this.state.chartLabels.length !== 0 ) {
            const data = {
                labels: this.state.chartLabels,
                datasets: [{
                    data: this.state.chartValues,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            };
            PieChart = (
                <Pie
                data={data}
                onElementsClick={e => this.props.fetchDetails(e)}
                width={300}
                height={300}
                options={{maintainAspectRatio: false}}
                />
            );
        }
        return(
            <div>
                {PieChart}
            </div>
        );
    }
    
    
}
export default PieChart
