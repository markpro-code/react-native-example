import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { isEmpty } from '@src/utils/common';
import { get, noop } from 'lodash';
import Spinner from '@src/images/spinner.svg';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  spinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    alignSelf: 'center',
  },
  listItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
    flexDirection: 'row',
  },
  itemContentView: {
    flex: 1,
  },
  itemIconView: {},
  iconRight: {
    height: 30,
    width: 30,
  },
});

export default class MasterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showSpin: false,
      refreshing: false,
      page: 1,
      totalPages: 0,
    };
  }

  componentDidMount() {
    if (this.props.loadOnMount) {
      this.reload({ reset: true });
    }
  }

  reload({ reset = false, page = 1 } = {}) {
    if (reset) {
      page = 1;
    }
    this.setState(
      state => ({ showSpin: isEmpty(state.list), refreshing: true, page }),
      () => {
        this.props
          .onRequest({ reset, page, limit: 10 })
          .then(response => {
            const list = response?.data || [];
            const totalPages = get(response, 'meta.pagination.pages');
            this.setState(state => ({
              list: page <= 1 ? list : state.list.concat(list),
              totalPages,
            }));
          })
          .finally(() => {
            this.setState({ showSpin: false, refreshing: false });
          });
      }
    );
  }

  /* --------- [handlers-start] ----------- */
  handleEndReached = () => {
    const { page, totalPages } = this.state;
    if (page < totalPages) {
      this.reload({ page: this.state.page + 1 });
    }
  };

  /* --------- [handlers-end] ----------- */

  render() {
    const { style, renderItem, ListHeaderComponent, ListEmptyComponent, keyExtractor, onRequest } = this.props;
    const { list, showSpin, refreshing } = this.state;
    return (
      <View style={[styles.listContainer, style]}>
        {showSpin ? (
          <View style={styles.spinContainer}>
            <Spinner style={styles.spinner} />
          </View>
        ) : (
          <FlatList
            refreshing={refreshing}
            style={styles.list}
            data={list}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onRefresh={() => this.reload()}
            onEndReached={this.handleEndReached}
            initialNumToRender={10}
            onEndReachedThreshold={0.3}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </View>
    );
  }

  renderFooter() {
    const { page, totalPages, lastPage, refreshing } = this.state;
    const noMore = page >= totalPages;
    const loadingMore = refreshing && !lastPage;
    const { noMoreTip } = this.props;

    if (loadingMore) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} style={{ height: 50 }} size="small" />
          <Text style={{ color: '#646464', fontSize: 12 }}>加载中...</Text>
        </View>
      );
    } else if (noMore && !refreshing) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20, flexDirection: 'row' }}>
          <Text style={{ color: '#646464' }}>{noMoreTip}</Text>
        </View>
      );
    }
  }
}

// type check
MasterList.propTypes = {
  style: PropTypes.object,
  onRequest: PropTypes.func,
  renderItem: PropTypes.func,
  loadOnMount: PropTypes.bool,
  keyExtractor: PropTypes.func,
  ListHeaderComponent: PropTypes.object,
  ListEmptyComponent: PropTypes.object,
  noMoreTip: PropTypes.string,
};

MasterList.defaultProps = {
  style: {},
  onRequest: noop,
  renderItem: noop,
  loadOnMount: false,
  keyExtractor: item => get(item, 'id'),
  ListHeaderComponent: noop,
  ListEmptyComponent: noop,
  noMoreTip: '无更多数据显示',
};
