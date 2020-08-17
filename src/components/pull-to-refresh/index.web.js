/**
 *  Component Pull to Refresh
 *
 *  props:
 *  ----------
 *  onRefresh: function: (resolve, reject) => {}
 */

import React from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';
import Spinner from '@src/images/spinner.svg';
import '@src/styles/pull-to-refresh.css';

export default class PullToRefresh extends React.Component {
  render() {
    const { children, onRefresh } = this.props;

    return (
      <ReactPullToRefresh
        className="bt-pull-to-refresh"
        icon={<span className="arrow-down">&darr;</span>}
        loading={<Spinner width={40} height={40} className="loading" />}
        onRefresh={onRefresh}
      >
        {children}
      </ReactPullToRefresh>
    );
  }
}
