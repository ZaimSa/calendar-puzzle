import React, { PureComponent } from 'react';
import { eventMock } from '../../../assets/mocks/event';
import { timeToMinute } from '../../../helpers/time';
import { createOverlapsedArray } from '../../../helpers/overlapse';
import './styles.css';

/**
 * @class Calendar - Calendar Screen containing events
 */
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
    const overlapsArray = createOverlapsedArray(eventMock);

    return (
      overlapsArray.map((column, i) => (
        <div
          className="event-block"
          key={`calendar_column_${i}`}>
          {
            column.map((event) => (
              <div
                key={event.id}
                className="event-block__item"
                style={{
                  top: (((window.innerHeight * timeToMinute(event.start)) / 720)),
                  height: ((window.innerHeight * event.duration) / 720)
                }}
              >
                {event.id}
              </div>
            ))
          }
        </div>
      ))
  )
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
