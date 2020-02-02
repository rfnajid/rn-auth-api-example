import AsyncStorage from '@react-native-community/async-storage';

set =  async (key,data) => {
    console.log('STORAGE SERVICE trying to SET',key," => ",data);
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
      console.log('Storage Service SET error :', error);
    }
};

get = async (key) => {
    console.log('STORAGE SERVICE trying to GET',key);
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        // Error retrieving data
        console.log("Storage Service GET error : ",error);
    }
}

remove = async (key) => {
    console.log('STORAGE SERIVCE trying to REMOVE',key);
    await AsyncStorage.removeItem(key);
}

// add other navigation functions that you need and export them

export default {
  set,
  get,
  remove
};