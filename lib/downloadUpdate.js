import { Updates } from 'expo';

const downloadUpdate = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Updates.reloadFromCache();
    }
  } catch (e) {
    console.log(e);
  }
};

export default downloadUpdate;
