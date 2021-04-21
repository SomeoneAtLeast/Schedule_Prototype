import React, {useEffect, useCallback} from "react";
import {connect} from "react-redux"
import {SeatsLoaded, SeatsRequested} from "../../store/actions"
import PropTypes from 'prop-types';
import {useHttp} from "../../hooks/http.hook"

import "./seats-field.scss"

import SeatsItem from "../seats-item";
import DualBall from "../dual-ball";


const SeatsField = ({SeatsLoaded, SeatsRequested, seats, loading}) => {

    const {request} = useHttp();

    const getSeats = useCallback(async () => {
        try {
            const data = await request("/api/seats/seats", "GET");
            SeatsLoaded(data);
        } catch (e) {}
    }, [request, SeatsLoaded]);

    useEffect(() => {
        SeatsRequested();
        getSeats();
    }, [getSeats, SeatsRequested]);

    
    const table = (elements, upfrom, upTo, lower) => {
        const upseats = elements.filter((item) => {
            return item.key >= upfrom && item.key <= upTo;
        })
    
        const lowerseats = elements.filter((item) => {
            return item.key > upTo && item.key < lower;
        })

        return (
         <table className="seats-table">
             <tbody>
                <tr className="seats-table__row">
                    {upseats}
                </tr>
                <tr className="seats-table__row">
                    {lowerseats}
                </tr>
             </tbody>
         </table>
        )
    };

    const arrangementsFieldElements = seats.map((item) => {
        const {oldIp, newIp, seatNumber, id} = item;

        return (
            <td 
                className="seats-table__сell"
                key={id}>
                <SeatsItem
                    id={id}
                    oldIp={oldIp}
                    newIp={newIp}
                    seatNumber={seatNumber}/>
            </td>
        )
    })
    

    if (loading) {
        return (
            <div className="seats-field">
                <div className="seats-field-title">
                    Рабочие места
                </div>
                <DualBall/>
            </div>
        )
    }

    return (
        <div className="seats-field">
            <div className="seats-field-title">
                Рабочие места
            </div>
            <div className="seats-field-tables">
                {table(arrangementsFieldElements, 0, 2, 6)}
                {table(arrangementsFieldElements, 6, 8, 12)}
                {table(arrangementsFieldElements, 12, 14, 18)}
                {table(arrangementsFieldElements, 18, 20, 24)}
            </div>
        </div>
    )
}

SeatsField.propTypes = {
    seats: PropTypes.array,
}


const mapStateToProps = ({seats, loading}) => {
    return {
        seats,
        loading

    }
}

const mapDispatchToProps = {
    SeatsLoaded,
    SeatsRequested
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatsField);