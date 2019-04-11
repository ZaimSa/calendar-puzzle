/**
 * @function timeToMinute - used to convert time to minutes
 * @param {string} time - Time to convert in format HH:mm
 * @return {number} - Return the converted time as minutes
 */
export const timeToMinute = (time) => {
  if (!time) {
    throw new Error("You must fill the time");
  }
  const [hour, minute] = time.split(':');
  const convertedTime = (((parseInt(hour) - 9) * 60) + parseInt(minute))
  return convertedTime;
}