/**
 * Created by Tejaswaroop on 10/2/16.
 */

import React, { Component } from 'react';

class SelectCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fiscalYear: '',
        };
    }
    render() {
        let options = '';
        if (this.props.years) {
            options = this.props.years.map((year) => {
                return (
                    <option value={year} key={year}>{year}</option>
               );
            });
        }
        return (
            <div>
                <label>Fiscal Year:</label>
                <select
                    className="form-control"
                    value={this.state.fiscalYear}
                    onChange={event => this.onInputChange(event.target.value)}
                    id="fiscalYear"
                >
                    <option>All</option>
                    {options}
                </select>
            </div>
        );
    }
    onInputChange(fiscalYear) {
        this.setState({ fiscalYear });
        this.props.onFiscalYearChnage(fiscalYear);
    }
}

export default SelectCriteria;

