import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
const timeAgoFormat = { flavour: 'tiny' };

export default formatAgo = time =>
  timeAgo.format(new Date(time), timeAgoFormat);
