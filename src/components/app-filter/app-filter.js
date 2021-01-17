import React, {Component} from "react";

import "./app-filter.scss"

export default class Filter extends Component {
    constructor () {
        super();

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
        const {btnText} = this.props;
        const {active} = this.state;
        let classNames = "filter-list__filter";

        if (active) {
            classNames += " active";
        }

        return (
            <li className={classNames}>
                <button
                className="filter-list__filter-btn"
                onClick = {this.onActive}>
                    {btnText}
                </button>
            </li>
        )
    }
}