import React from 'react';
import ReactInfiniteCalendar from 'react-infinite-calendar';
import localeCN from 'date-fns/locale/zh_cn';
import './style.css';

export * from 'react-infinite-calendar';

const defaultLocale = {
  blank: '选择日期...',
  headerFormat: 'M月D日',
  locale: localeCN,
  todayLabel: {
    long: '今天',
    short: '今天',
  },
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  weekStartsOn: 0,
};

export default function WebInfiniteCalendar(props) {
  const { locale, ...otherProps } = props;
  return <ReactInfiniteCalendar locale={locale || defaultLocale} {...otherProps} />;
}
