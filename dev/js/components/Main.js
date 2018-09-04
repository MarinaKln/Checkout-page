import React, {Component} from 'react';
import Sidebar from "./sidebar";
import TicketsBox from "./TicketsBox";

export default class Main extends Component {

    constructor() {
        super();

        this.state = {
            initialData: [],
            tickets: [],
            currentCurrency: 1,
            currentStop: 'all',
            isLoading: false
        };

        this.clickStopsHandler = this.clickStopsHandler.bind(this);
        this.clickCurrencyHandler = this.clickCurrencyHandler.bind(this);
        this.filterTickets = this.filterTickets.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('/jsons/tickets.json')
            .then(response => response.json())
            .then(data => this.setState({
                tickets: data,
                initialData: data,
                isLoading: false
            }));
    }

    clickStopsHandler (e, value) {

        this.setState({
            currentStop: value
        }, this.filterTickets)

    }

    clickCurrencyHandler(e, value) {
        if(value != this.state.currentCurrency) {
            this.setState({
                currentCurrency: value
            })
        }
    }

    filterTickets() {
        let tickets = this.state.initialData;

        if(this.state.currentStop == 'all') {
            this.setState({
                tickets: tickets
            });

            return false;
        }

        let sort = tickets.filter((item) => {
            return parseInt(item.stops) == this.state.currentStop;
        });

        this.setState({
            tickets: sort
        })
    }

    render() {
        let state = this.state;

        return (
            <div className={`main ${state.isLoading ? 'loading' : ''}`}>
                <Sidebar
                    currentCurrency = {state.currentCurrency}
                    currentStop = {state.currentStop}
                    clickStopsHandler = {this.clickStopsHandler}
                    clickCurrencyHandler = {this.clickCurrencyHandler}
                />
                <TicketsBox
                    tickets = {this.state.tickets}
                    currency = {state.currentCurrency}
                />
            </div>
        )
    }
}