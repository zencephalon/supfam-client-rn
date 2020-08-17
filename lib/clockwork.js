const THIRTY_MINUTES = 30 * 60 * 1000;
const THREE_HOURS = 3 * 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;
const MIN_OPACITY = 0.2;

const getDateStringIfNotToday = (date) => {
  const now = new Date();
  if (
    now.getFullYear() == date.getFullYear() &&
    now.getMonth() == date.getMonth() &&
    now.getDate() == date.getDate()
  ) {
    return '';
  }

  let formattedMonth = date.getMonth() + 1;
  if (formattedMonth < 10) {
    formattedMonth = `0${formattedMonth}`;
  }
  let formattedDay = date.getDate();
  if (formattedDay < 10) {
    formattedDay = `0${formattedDay}`;
  }
  return `${formattedMonth}/${formattedDay}/${now
    .getFullYear()
    .toString()
    .substr(-2)} `;
};

export const formatMessageTimeflag = (date) => {
  let amPm = 'am';
  let formattedHour = date.getHours();
  let formattedMinute = date.getMinutes();
  if (formattedMinute < 10) {
    formattedMinute = `0${formattedMinute}`;
  }
  if (formattedHour > 12) {
    amPm = 'pm';
    formattedHour = formattedHour - 12;
  }

  const dateString = getDateStringIfNotToday(date);

  return `${dateString}${formattedHour}:${formattedMinute}${amPm}`;
};

const timeSinceUpdate = (updatedAt) => {
  const statusUpdatedStamp = new Date(updatedAt).getTime();
  const nowStamp = new Date().getTime();
  return nowStamp - statusUpdatedStamp;
};

export const isRecent = (updatedAt) => {
  return timeSinceUpdate(updatedAt) < THIRTY_MINUTES;
};

export const statusOpacity = (updatedAt) => {
  const millisSinceUpdate = timeSinceUpdate(updatedAt);
  let opacity = 1;

  if (millisSinceUpdate > THREE_HOURS && millisSinceUpdate < ONE_DAY) {
    const intoGreyingPeriod = millisSinceUpdate - THREE_HOURS;
    const percentIn = intoGreyingPeriod / (ONE_DAY - THREE_HOURS);
    const opacityModifier = (1 - MIN_OPACITY) * percentIn;
    opacity = 1 - opacityModifier;
    opacity = Math.round(100 * opacity) / 100;
  }
  if (millisSinceUpdate > ONE_DAY) {
    opacity = MIN_OPACITY;
  }

  return opacity;
};
