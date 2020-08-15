import React from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenContainer from '@src/components/screen-container';
import PullToRefresh from '@src/components/pull-to-refresh';

const styles = StyleSheet.create({});

export default class ExamplePullRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  render() {
    return (
      <ScreenContainer>
        <PullToRefresh>
          <Text>Pull down to see RefreshControl indicator</Text>
        </PullToRefresh>
      </ScreenContainer>
    );
  }
}
