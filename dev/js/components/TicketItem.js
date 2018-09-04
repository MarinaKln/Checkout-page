import React, {Component} from 'react';

export default class TicketItem extends Component {
    constructor(props) {
        super(props);
    }

   stopsCount(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    getWeekDay(date) {
        var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

        return days[date.getDay()];
    }

    getMonthName(date) {
        let month = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

        return month[date.getMonth()];
    }

    getDate(str) {
        let formattedDate = str.split('.').map((item, i) => {
            return parseInt(item);
        });

        let date = new Date(formattedDate);

        let newDate = date.getDate() + ' ' + this.getMonthName(date) + ' ' + date.getFullYear() + ', ' + this.getWeekDay(date);

        return newDate;
    }

    getCurrencySign(val) {
        let sign;

        switch(val) {
            case 1:
                sign = ' ₽';
                break;
            case 2:
                sign = ' $';
                break;
            case 3:
                sign = ' €';
                break;
        }

        return sign;
    }

    getPriceByCurrency(value, currency) {
        let usd = 27.7;
        let euro = 32.1;

        let price = value;

        switch (currency) {
            case 1:
                break;
            case 2:
                price = value / usd;
                break;
            case 3:
                price = value / euro;
                break;
        }

        return Math.round(price);
    }

    render() {
        const item = this.props;
        let stops;

        if(item.stops > 0) {
            stops = (
                <span>{item.stops} {this.stopsCount(item.stops, ['пересадка', 'пересадки'])}</span>
            );
        }

        return (
            <div className="ticket-item">
                <div className="ticket-item__buy-wrap">
                    <button className="ticket-item__buy-btn button">
                        <span>Купить за</span>
                        <br/>
                        <span>
                            {this.getPriceByCurrency(item.price, item.currentCurrency)}
                        </span>
                        <span className="ticket-item__currency">
                            {this.getCurrencySign(item.currentCurrency)}
                        </span>
                    </button>
                </div>
                <div className="ticket-item__info-wrap">
                    <div className="ticket-item__info-departure">
                        <p className="ticket-item__info-time">{item.departureTime}</p>
                        <p className="ticket-item__info-name">{item.origin}, {item.originName}</p>
                        <p className="ticket-item__info-date">{this.getDate(item.departureDate)}</p>
                    </div>
                    <div className="ticket-item__info-stops">
                        {stops}
                    </div>
                    <div className="ticket-item__info-arrival">
                        <p className="ticket-item__info-time">{item.arrivalTime}</p>
                        <p className="ticket-item__info-name">{item.destinationName}, {item.destination}</p>
                        <p className="ticket-item__info-date">{this.getDate(item.arrivalDate)}</p>
                    </div>
                </div>
            </div>
        )
    }
}