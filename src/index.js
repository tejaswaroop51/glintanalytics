/**
 * Created by Tejaswaroop on 10/2/16.
 */

//Create a new component. This component should produce some HTML

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import _ from 'underscore';
import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import PieChart from './components/piechart';
import SelectCriteria from './components/selectcriteria';
import RevenueReport from './components/revenuereport';


const ROOT_URL=`http://localhost:3000/glintserver/datafetch`; //Node JS end point to fetch data from server.

class App extends Component {

    constructor(props){

        super(props);

        this.state = {
            data: [],
            years: [],
            chartLabels: [],
            chartValues: [],
            currentYear: 'All',
            revenueReport: [],
            showRevenueReport: false,
            currentItem: ''

        };
    }
    componentWillMount() {
        this.getAnalytics();
    }
    getAnalytics() {
        const request = axios.post(ROOT_URL);
        const _this = this;
        request.then(function (response) {
            _this.setState({ data: response.data });
            _this.setState({ years: _.map(_.groupBy(response.data, (product) => (product.year)), (list,key) => (key)) });
            let chartLabels=[];
            let chartValues=[];
            _.map(_.groupBy(response.data, (product) => (product.product)), (list,key) => {
                let revenue = 0;
                list.map((obj)=> { revenue = revenue + obj.revenue; });
                chartLabels.push(key);
                chartValues.push(revenue);
            });
            _this.setState({ chartLabels });
            _this.setState({ chartValues });
            _this.setState({ currentYear: 'All' });
        });

    }
    fiscalYear(year) {
        this.setState({ showRevenueReport: false});
        let chartLabels=[];
        let chartValues=[];
        this.setState({ currentYear: year });
        if(year !== 'All') {
            _.map(_.groupBy(_.where(this.state.data, {year: parseInt(year)}), (product) => (product.product)), (list,key) => {
                let revenue = 0;
                list.map((obj)=> { revenue = revenue + obj.revenue; });
                chartLabels.push(key);
                chartValues.push(revenue);
            });
            this.setState({ chartLabels });
            this.setState({ chartValues });
        } else {
            _.map(_.groupBy(this.state.data, (product) => (product.product)), (list,key) => {
                let revenue = 0;
                list.map((obj)=> { revenue = revenue + obj.revenue; });
                chartLabels.push(key);
                chartValues.push(revenue);
            });
            this.setState({ chartLabels });
            this.setState({ chartValues });
        }
    }
    fetchDetails(e) {
        this.setState({ currentItem: e });
        let revenueReport = [];
        if(this.state.currentYear !== 'All') {
            _.pick(_.groupBy(_.where(this.state.data, {year: parseInt(this.state.currentYear)}) , (product) => (product.product)), e)[e].map((list) => {
                revenueReport.push({id: list.id, fiscalYear: list.year, product: list.product, region: list.country, revenue: currencyFormatter.format(parseInt(list.revenue), { code: 'USD' })});
            });
        } else {
            _.pick(_.groupBy(this.state.data , (product) => (product.product)), e)[e].map((list) => {
                revenueReport.push({id: list.id, fiscalYear: list.year, product: list.product, region: list.country, revenue: currencyFormatter.format(parseInt(list.revenue), { code: 'USD' })});
            });
        }
        this.setState({ revenueReport });
        this.setState({ showRevenueReport: true});
    }
    render(){
        let showRevenueReport = '';
        if(this.state.showRevenueReport) {
            showRevenueReport = (
                <div>
                    <label>Revenue Report, {this.state.currentYear}, {this.state.currentItem}</label>
                    <RevenueReport revenueReport={this.state.revenueReport}/>
                </div>
            );
        }
        return(
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading text-center">Simple Analytics Web App</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <SelectCriteria years = {this.state.years} onFiscalYearChnage={year => this.fiscalYear(year)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <label>Revenue by Product, {this.state.currentYear}</label>
                                <PieChart chartLabels={this.state.chartLabels} chartValues={this.state.chartValues}  fetchDetails={event => this.fetchDetails(event[0]._model.label)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                {showRevenueReport}
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer text-center">Glint UI Coding Challenge</div>
                </div>
            </div>
        );
    }

}

// Take this component's generated HTML and put it in the page (in the DOM)

// <App /> is the instance of class App

ReactDom.render(<App />, document.querySelector('.container'));
