import React from 'react';
import { Text } from 'react-native';
import ScreenContainer from '@src/components/screen-container';
import PullToRefresh from '@src/components/pull-to-refresh';

export default class ExamplePullRefresh extends React.Component {
  _handleRefresh = resolve => {
    setTimeout(function () {
      resolve();
    }, 3000);
  };

  render() {
    return (
      <ScreenContainer>
        <PullToRefresh onRefresh={this._handleRefresh}>
          <Text>Pull down to see RefreshControl indicator</Text>
        </PullToRefresh>
      </ScreenContainer>
    );
  }
}
