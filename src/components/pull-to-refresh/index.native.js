/**
 *  Component Pull to Refresh
 *
 *  props:
 *  ----------
 *  onRefresh: function: (resolve, reject) => {}
 */

import React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { noop } from 'lodash';

const time = 2000;
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default class PullToRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    new Promise((resolve, reject) => {
      this.props.onRefresh(resolve, reject);
    }).then(() => {
      this.setState(preState => ({ ...preState, refreshing: false }));
    });
  };

  handleWebRefresh = () => wait(time);

  render() {
    const { children } = this.props;
    const { refreshing } = this.state;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
      >
        {children}
      </ScrollView>
    );
  }
}
// type check
PullToRefresh.propTypes = {
  onRefresh: PropTypes.func,
};

PullToRefresh.defaultProps = {
  onRefresh: noop,
};
