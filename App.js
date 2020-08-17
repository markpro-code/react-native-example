/* To finalize installation of react-native-gesture-handler, add the following at the top
(make sure it's at the top and there's nothing else before it) of your entry file */
import 'react-native-gesture-handler';
import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as AntdProvider } from '@ant-design/react-native';
import { GlobalStateContext } from '@src/services/contexts';
import { navigationRef } from '@src/services/root-navigation';
import { renderScreens } from '@src/screens';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isReady: false,
      global: {
        userInfo: {
          username: 'Mark',
        },
        setGlobalState: setFn =>
          this.setState(preState => ({
            global: setFn(preState.global),
          })),
      },
    };
  }

  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }

  render() {
    const { global, isReady } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <GlobalStateContext.Provider value={global}>
        <View style={styles.appContainer}>
          <AntdProvider>
            <NavigationContainer ref={navigationRef}>{renderScreens()}</NavigationContainer>
          </AntdProvider>
        </View>
      </GlobalStateContext.Provider>
    );
  }
}
