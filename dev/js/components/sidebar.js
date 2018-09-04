import React, {Component} from 'react';

let currency = [
    {
        name: 'рубль',
        shortName: 'rub',
        value: 1,
        active: true
    }, {
        name: 'гривна',
        shortName: 'usd',
        value: 2
    }, {
        name: 'евро',
        shortName: 'eur',
        value: 3
    }
];

let stops = [
    {
        name: 'Все',
        value: 'all'
    }, {
        name: ' Без пересадок',
        value: '0'
    }, {
        name: '1 пересадка',
        value: '1'
    }, {
        name: '2 пересадки',
        value: '2'
    }, {
        name: '3 пересадки',
        value: '3'
    }
];

class CurrencyList extends Component {
    constructor() {
        super();
    }

    render() {
        let props = this.props;
        let active = (props.currentCurrency == props.id) ? 'active' : '';

        return (
            <button className={`currency-list__item button ${active}`} onClick={(e) => props.clickHandler(e, props.id)}>
                <span className="currency-list__item-name">{this.props.shortName}</span>
            </button>
        )
    }
}

class StopsList extends Component {
    constructor() {
        super();
    }

    render() {
        let props = this.props;
        let input;

        return (
            <li className="stops-list__item">
                <label className="stops-list__item-label" >
                    <input className="stops-list__item-checkbox" name="stops" type="radio" value={props.value} onChange={(e) => props.clickHandler(e, props.value)}/>
                    <span className="stops-list__item-check"> </span>
                    <span className="stops-list__item-name">{props.name}</span>
                </label>
            </li>
        )
    }
}

export default class Sidebar extends Component {

    constructor() {
        super();

        this.createCurrencyList = this.createCurrencyList.bind(this);
        this.createStopsList = this.createStopsList.bind(this);
    }

    createCurrencyList(item, index) {
        return (
            <CurrencyList
                key = {index}
                name = {item.name}
                id = {item.value}
                shortName = {item.shortName}
                clickHandler = {this.props.clickCurrencyHandler}
                currentCurrency = {this.props.currentCurrency}
            />
        )
    }

    createStopsList(item, index) {
        return (
            <StopsList
                key = {index}
                name = {item.name}
                value = {item.value}
                clickHandler = {this.props.clickStopsHandler}
                currentStop = {this.props.currentStop}
            />
        )
    }

    render() {
        return (
            <div className="sidebar-wrap">
                <div className="sidebar">
                    <div className="sidebar__top">
                        <p className="sidebar__title">ВАЛЮТА</p>
                        <div className="currency-list">
                            {currency.map(this.createCurrencyList)}
                        </div>
                    </div>
                    <div className="sidebar__bottom">
                        <p className="sidebar__title">КОЛИЧЕСТВО ПЕРЕСАДОК</p>
                        <ul className="stops-list">
                            {stops.map(this.createStopsList)}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}
