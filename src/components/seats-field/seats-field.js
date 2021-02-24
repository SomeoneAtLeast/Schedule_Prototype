import React, {Component} from "react";

import "./seats-field.scss"

import {seats} from "../../models/seats-model"

import SeatsItem from "../seats-item";


export default class SeatsField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seats: seats
        }

        this.onChangeSeatText = this.onChangeSeatText.bind(this);
    }

    onChangeSeatText(id, NewOldIp, NewNewIp, NewSeatNumber) {
        this.setState(({seats}) => {
            const index = seats.findIndex(elem => elem.id === id); 
            const oldSeat = seats[index];
            const newSeat = {...oldSeat, oldIp: NewOldIp, newIp: NewNewIp, seatNumber: NewSeatNumber}
            const newSeats = [...seats.slice(0, index), newSeat, ...seats.slice(index + 1)];

            return {
                seats: newSeats
            }
        })
    }

    table (elements, upfrom, upTo, lower) {
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
    }

    render() {
        const arrangementsFieldElements = this.state.seats.map((item) => {
            const {oldIp, newIp, seatNumber, id} = item;

            return (
                <td 
                    className="seats-table__сell"
                    key={id}>
                    <SeatsItem
                        id={id}
                        oldIp={oldIp}
                        newIp={newIp}
                        seatNumber={seatNumber}
                        onChangeSeatText={this.onChangeSeatText}/>
                </td>
            )
        })
        
        return (
            <div className="seats-field">
                {this.table(arrangementsFieldElements, 10, 12, 16)}
                {this.table(arrangementsFieldElements, 16, 18, 22)}
                {this.table(arrangementsFieldElements, 22, 24, 28)}
                {this.table(arrangementsFieldElements, 28, 30, 34)}
            </div>
        )
    }
}