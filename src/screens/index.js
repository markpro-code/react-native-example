import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@src/screens/home';
import ExamplePullRefresh from '@src/screens/example-pull-refresh';
import ExampleGlobalState from '@src/screens/example-global-state';
import ExampleInfiniteCalendar from '@src/screens/example-infinite-calendar';

const RootStack = createStackNavigator();
const { Navigator, Screen } = RootStack;

export function renderScreens() {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={HomeScreen} />
      <Screen name="ExamplePullRefresh" component={ExamplePullRefresh} />
      <Screen name="ExampleGlobalState" component={ExampleGlobalState} />
      <Screen name="ExampleInfiniteCalendar" component={ExampleInfiniteCalendar} />
    </Navigator>
  );
}
