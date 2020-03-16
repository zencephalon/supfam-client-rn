import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {
  canonical, // '1 second ago', '2 minutes ago', …
} from 'javascript-time-ago/gradation';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
const timeAgoFormat = { flavour: 'tiny', gradation: canonical };

export default formatAgo = time =>
  timeAgo.format(new Date(time), timeAgoFormat);
