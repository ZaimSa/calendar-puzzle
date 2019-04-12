/**
 * @function timeToMinute - used to convert time to minutes for layout assuming we start from 9
 * @param {string} time - Time to convert in format HH:mm
 * @return {number} - Return the converted time
 */
export const timeToMinute = (time) => { // TODO: Add time format handling
  if (!time) {
    throw new Error("You must fill the time");
  }
  const [hour, minute] = time.split(':');
  const convertedTime = (((parseInt(hour) - 9) * 60) + parseInt(minute))
  return convertedTime;
}