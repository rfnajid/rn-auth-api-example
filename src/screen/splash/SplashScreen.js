import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import NavigationService from '../../service/NavigationService';
import StorageService from '../../service/StorageService';
import { ACCESS_TOKEN } from '../../config/const';


export class SplashScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await StorageService.get(ACCESS_TOKEN);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    NavigationService.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
          <Text>This is Splashscreen</Text>
      </View>
    );
  }
}