/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { EditScreen } from './src/screen/app/edit/EditScreen';
import { MainScreen } from './src/screen/app/main/MainScreen';
import { LoginScreen } from './src/screen/auth/login/LoginScreen';
import NavigationService from './src/service/NavigationService';
import { SplashScreen } from './src/screen/splash/SplashScreen';

const AppStack = createStackNavigator (
  {
    Main: MainScreen,
    Edit: EditScreen
  },{
    initialRouteName: 'Main'
  }
);


const AuthStack = createStackNavigator(
  {
    Login: LoginScreen
  }, {
    initialRouteName: 'Login'
  }
);


const AppNavigator = createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
      Splash: SplashScreen
    }, {
      initialRouteName: 'Splash'
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />;
  }
}
