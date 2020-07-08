
const getDateStringIfNotToday = (date) => {
  const now = new Date();
  if(now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate()) {
    return '';
  }
  
  let formattedMonth = date.getMonth();
  if (formattedMonth < 10 ) { formattedMonth = `0${formattedMonth}`}
  let formattedDay = date.getDate();
  if (formattedDay < 10 ) { formattedDay = `0${formattedDay}`}
  return `${formattedMonth}/${formattedDay}/${now.getFullYear().toString().substr(-2)} `;
}

export const formatMessageTimeflag = (date) => {
  let amPm = 'am';
  let formattedHour = date.getHours();
  let formattedMinute = date.getMinutes();
  if(formattedMinute < 10) {
    formattedMinute = `0${formattedMinute}`;
  }
  if(formattedHour > 12) {
    amPm = 'pm';
    formattedHour = formattedHour - 12;
  }

  const dateString = getDateStringIfNotToday(date);

  return `${dateString}${formattedHour}:${formattedMinute}${amPm}`;
}
