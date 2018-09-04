import React, {Component} from 'react';
import TicketItem from "./TicketItem";

export default class TicketsBox extends Component {

    constructor(props) {
        super(props);

        this.createTicketsList = this.createTicketsList.bind(this);
    }

    sortTickets(arr) {
        arr.sort((a, b) => {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }

            return 0;
        });

        return arr;
    }

    createTicketsList(item, index) {
        return (
            <TicketItem
                key = {index}
                id = {index}
                price = {item.price}
                departureTime = {item.departure_time}
                origin = {item.origin}
                originName = {item.origin_name}
                departureDate = {item.departure_date}
                arrivalTime = {item.arrival_time}
                destination = {item.destination}
                destinationName = {item.destination_name}
                arrivalDate = {item.arrival_date}
                stops = {item.stops}
                currentCurrency = {this.props.currency}
            />
        )
    }

    render() {
        let sortItems = this.sortTickets(this.props.tickets);

        return (
            <div className="tickets__wrap">
                <div className="tickets-items__wrap">
                    {sortItems.map(this.createTicketsList)}
                </div>
            </div>

        )
    }
}
