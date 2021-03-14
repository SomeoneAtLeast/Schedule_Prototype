import PropTypes from 'prop-types';
import React, {Component} from "react";
import {Link} from 'react-router-dom';

import  "./main-nav.scss"
export default class MainNav extends Component {
    constructor() {
        super();

        this.state = {
            scheduleActive: true,
            arrangementsActive: false,
            workingshiftsActive: false
        }
    }
    
    componentDidMount() {
        if(this.props.location.pathname === "/seats/") {
            this.setState({
                scheduleActive: false,
                workingshiftsActive: false,
                arrangementsActive: true
            })
        } else if (this.props.location.pathname === "/workingshifts/") {
            this.setState({
                scheduleActive: false,
                workingshiftsActive: true,
                arrangementsActive: false
            })
        }
    }

    onActive (btnName) {
        if (btnName === "scheduleBtn") {
            this.setState({
                scheduleActive: true,
                arrangementsActive: false,
                workingshiftsActive: false
            })
        } else if (btnName === "arrangementsBtn") {
            this.setState({
                scheduleActive: false,
                workingshiftsActive: false,
                arrangementsActive: true
            })
        } else if (btnName === "workingshiftsBtn") {
            this.setState({
                scheduleActive: false,
                arrangementsActive: false,
                workingshiftsActive: true
            })
        }
    }
    
    render() {
        let scheduleClass = "main-nav__item-link";
        let arrangementsClass = "main-nav__item-link";
        let workingshiftsClass = "main-nav__item-link";
        const {scheduleActive, arrangementsActive, workingshiftsActive} = this.state;

        if (scheduleActive) {
            scheduleClass += " active-main-nav-btn";
        } 
        
        if (arrangementsActive) {
            arrangementsClass += " active-main-nav-btn";
        }

        if (workingshiftsActive) {
            workingshiftsClass += " active-main-nav-btn";
        }

        return (
            <ul className="main-nav">
                <li 
                    className="main-nav__item"
                    onClick={() => this.onActive("scheduleBtn")}>
                    <Link to="/" className={scheduleClass}>
                        График
                    </Link> 
                </li>
                <li 
                    className="main-nav__item"
                    onClick={() => this.onActive("workingshiftsBtn")}>
                    <Link to="/workingshifts/" className={workingshiftsClass}>
                        Смены
                    </Link>
                </li>
                <li 
                    className="main-nav__item"
                    onClick={() => this.onActive("arrangementsBtn")}>
                    <Link to="/seats/" className={arrangementsClass}>
                        Места
                    </Link>
                </li>
            </ul>
        )
    }
}

MainNav.propTypes = {
    location: PropTypes.object,
}