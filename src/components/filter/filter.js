import React, {Component} from "react";

import "./filter.scss"

export default class Filter extends Component {
    constructor (props) {
        super(props);

        this.state = {
            active: false,
        };

        this.onActive = this.onActive.bind(this);
    }

    onActive () {
        this.setState(({active}) => ({
            active: !active
        }))
    }

    render () {
        // eslint-disable-next-line react/prop-types
        const {btnText, onSort, id} = this.props;
        const {active} = this.state;
        let classNames = "filter-list__filter";

        if (active) {
            classNames += " active";
        }

        return (
            <li className={classNames}>
                <button
                className="filter-list__filter-btn"
                key = {id}
                onClick = {this.onActive, onSort}>
                    {btnText}
                </button>
            </li>
        )
    }
}