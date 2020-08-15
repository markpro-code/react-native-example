import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExamplePullRefresh from '@src/screens/example-pull-refresh';
import HomeScreen from '@src/screens/home';

const RootStack = createStackNavigator();
const { Navigator, Screen } = RootStack;

export function renderScreens() {
  return (
    <Navigator initialRouteName="ExamplePullRefresh">
      <Screen name="ScreenHome" component={HomeScreen} />
      <Screen name="ExamplePullRefresh" component={ExamplePullRefresh} />
    </Navigator>
  );
}
