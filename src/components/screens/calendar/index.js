import React, { PureComponent } from 'react';
import { eventMock } from '../../../assets/mocks/event';
import { timeToMinute } from '../../../helpers/time';
import './styles.css';

class Calendar extends PureComponent {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.forceUpdate();
  }

  renderEvents () {
    return eventMock.map((event) => (
      <div
        key={event.id}
        className="event"
        style={{
          position: "absolute",
          top: (((window.innerHeight * timeToMinute(event.start)) / 720)),
          height: ((window.innerHeight * event.duration) / 720),
          width: "100%"
        }}
      >{event.start}</div>
    ))
  }

  render() {
    return (
      <div className="calendar">
        {this.renderEvents()}
      </div>
    );
  }
}

export default Calendar;
