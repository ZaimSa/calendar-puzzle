import moment from 'moment';

/**
 * @function checkOverlapsed - Function used to check if the event range is inside the current column
 * @param {event[]} overlapsArray - Current array representing the column, it contain event 
 * @param {moment} currentEventStart - CurrentEvent start range
 * @param {moment} currentEventEnd - CurrentEvent end range
 * @returns {bool} - Return if the current event overlapse the current column or not
 */
export const checkOverlapsed = (overlapsArray, currentEventStart, currentEventEnd) => {
  let isOverlapsed = false;
  overlapsArray.forEach((overlapsedEvent) => {
    const overlapsedEventStart = moment(overlapsedEvent.start, 'HH:mm');
    const overlapsedEventEnd = moment(overlapsedEvent.start, "HH:mm").add(overlapsedEvent.duration, 'minutes');
      if (( currentEventStart.isBetween(overlapsedEventStart, overlapsedEventEnd, 'minutes') // TODO: Ask if it should include bounds or not ?
            || currentEventEnd.isBetween(overlapsedEventStart, overlapsedEventEnd, 'minutes'))
        ||
          (overlapsedEventStart.isBetween(currentEventStart, currentEventEnd, 'minutes')
            || overlapsedEventEnd.isBetween(currentEventStart, currentEventEnd, 'minutes'))
      ) {
        isOverlapsed = true;
      }
  })
  return isOverlapsed;
}

/**
 * @function createOverlapsedArray - Function used to create the event array
 * The algorithm go through the event array and generate column according to if it's overlapsing something or not
 * Basically, while it is overlapsing something, it's going to next column.
 * @param {event[]} events - List of initial events
 * @returns {Array.<event[]>} - It returns a two dimensional array, the first level represent column, and the second level is an event array
 */
export const createOverlapsedArray = (events) => {
  const overlapsArray = [];
  events.forEach((event) => {
    const currentEventStart = moment(event.start, 'HH:mm');
    const currentEventEnd = moment(event.start, "HH:mm").add(event.duration, 'minutes');
      let i = 0;
      let isOverlapsed;
      do {
        isOverlapsed = false;
        if (overlapsArray[i]) {
          isOverlapsed = checkOverlapsed(overlapsArray[i], currentEventStart, currentEventEnd);
        }
        i = i + 1;
      } while (isOverlapsed);
      if (!overlapsArray[i - 1]) {
        overlapsArray[i - 1] = [event]
      } else {
        overlapsArray[i - 1].push(event);
      }
  })
  return overlapsArray;
}
