import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@src/screens/home';
import ExamplePullRefresh from '@src/screens/example-pull-refresh';
import ExampleGlobalState from '@src/screens/example-global-state';
import ExampleWebInfiniteCalendar from '@src/screens/example-web-infinite-calendar';
import ExampleWebFilePreview from '@src/screens/example-web-file-preview';

const RootStack = createStackNavigator();
const { Navigator, Screen } = RootStack;

export function renderScreens() {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={HomeScreen} />
      <Screen name="ExamplePullRefresh" component={ExamplePullRefresh} />
      <Screen name="ExampleGlobalState" component={ExampleGlobalState} />
      <Screen name="ExampleWebInfiniteCalendar" component={ExampleWebInfiniteCalendar} />
      <Screen name="ExampleWebFilePreview" component={ExampleWebFilePreview} />
    </Navigator>
  );
}
