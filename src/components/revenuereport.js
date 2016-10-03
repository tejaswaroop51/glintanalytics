/**
 * Created by Tejaswaroop on 10/2/16.
 */

import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class RevenueReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            revenueReport: [],
        };
    }
    componentWillMount() {
        if (this.props.revenueReport.length !== 0) {
            this.setState({ revenueReport: this.props.revenueReport});
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.revenueReport.length !== 0) {
            this.setState({ revenueReport: nextProps.revenueReport });
        }
    }
    componentWillUpdate(nextProps, nextState) {
        return nextState.revenueReport !== this.state.revenueReport;
    }
    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
                From { start } to { to }, totals is { total }
            </p>
        );
    }
    render() {
        let revenueReportRender = '';
        if (this.state.revenueReport.length !== 0) {
            const options = {
                page: 0,
                sizePerPageList: [{
                    text: '6', value: 6
                }, {
                    text: '12', value: 12
                }, {
                    text: 'All', value: this.state.revenueReport.length
                } ],
                sizePerPage: 6,
                pageStartIndex: 0,
                paginationSize: 3,
                prePage: 'Prev',
                nextPage: 'Next',
                firstPage: 'First',
                lastPage: 'Last',
                paginationShowsTotal: this.renderShowsTotal,
                hideSizePerPage: true
            };
            revenueReportRender = (
                <BootstrapTable data={this.state.revenueReport} tableBodyClass="table table-striped" pagination={ true } options={ options } key={this.state.revenueReport} search={ true }>
                    <TableHeaderColumn dataField='id' isKey={ true }>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='fiscalYear'>Fiscal Year</TableHeaderColumn>
                    <TableHeaderColumn dataField='product'>Product</TableHeaderColumn>
                    <TableHeaderColumn dataField='region'>Region</TableHeaderColumn>
                    <TableHeaderColumn dataField='revenue'>Revenue</TableHeaderColumn>
                </BootstrapTable>
            );
        }
        return(
            <div>
                {revenueReportRender}
            </div>
        );
    }
}

export default RevenueReport;
