import * as Updates from 'expo-updates';

const downloadUpdate = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Updates.reloadAsync();
    }
  } catch (e) {
    console.log(e);
  }
};

export default downloadUpdate;
