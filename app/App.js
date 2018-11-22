import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import RootNavigator from './routes';
export default class App extends React.Component {
  async initializeApp () {
    try {
      await AsyncStorage.setItem('savingBalance', '9862.79');
      await AsyncStorage.setItem('chequingBalance', '1583.13');
      console.log('Successfully initialized mock data');
    } catch (error) {
      console.log('Could not initialize mock data', error);
    }
  }

  render() {
    this.initializeApp();
    return (
      <RootNavigator/>
    );
  }
}