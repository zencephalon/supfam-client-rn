import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const storageKey = 'emoji_history_3';

interface EmojiCounter {
  emojis: any;
}

class EmojiHistory {
  data?: EmojiCounter;

  constructor() {
    this.data = undefined;
  }

  init = async () => {
    this.data = JSON.parse(
      (await AsyncStorage.getItem(storageKey)) || 'null'
    ) || {
      '👍': 1,
      '👎': 1,
      '❤️': 1,
      '😃': 1,
      '😇': 1,
      '😂': 1,
      '😐': 1,
      '😠': 1,
      '🤮': 1,
      '🤯': 1,
      '😭': 1,
      '🥺': 1,
      '🔥': 1,
      '❄️': 1,
      '🥰': 1,
      '🤔': 1,
      '😒': 1,
      '✊🏿': 1,
    };

    console.log('EmojiHistory', this.data);
  };

  get = () => {
    return this.data;
  };

  mostUsed = () => {
    return _.take(
      _.sortBy(_.toPairs(this.data), ([_emoji, count]) => count),
      18
    );
  };

  increment = (emoji: string) => {
    const newData = {
      ...this.data,
      [emoji]: (this.data[emoji] || 0) + 1,
    };
    this.data = newData;
    return AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  };

  remove = () => {
    AsyncStorage.removeItem(storageKey);
  };
}

const emojiHistory = new EmojiHistory();

export default emojiHistory;
