import React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Text, View, Image } from 'react-native';
import ReactPullToRefresh from 'react-pull-to-refresh';
// import RMCPullToRefresh from 'rmc-pull-updown-to-refresh';
import Spinner from '@src/images/spinner.svg';

console.info('typeof Spinner', typeof Spinner);
console.info('Spinner', Spinner);

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
    wait(time).then(() => this.setState(preState => ({ ...preState, refreshing: false })));
  };

  handleWebRefresh = () => wait(time);

  renderWeb() {
    const { children } = this.props;
    // return <Spinner height={100} width={100} />;

    return (
      <ReactPullToRefresh
        style={{
          flex: 1,
          textAlign: 'center',
        }}
        icon={<span className="arrow-down">&darr;</span>}
        loading={<Spinner width={32} height={32} className="loading" />}
        onRefresh={(resolve, reject) => wait(2000).then(resolve)}
      >
        {children}
      </ReactPullToRefresh>
    );
  }

  renderNative() {
    const { style, children } = this.props;
    const { refreshing } = this.state;

    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
      >
        <Spinner height={100} width={100} />
        {children}
      </ScrollView>
    );
  }

  render() {
    return Platform.OS === 'web' ? this.renderWeb() : this.renderNative();
  }
}
