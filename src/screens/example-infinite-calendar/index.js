import React from 'react';
import { Dimensions } from 'react-native';
import InfiniteCalendar, { withRange, Calendar } from '@src/components/web-infinite-calendar';
import ScreenContainer from '@src/components/screen-container';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CalendarWithRange = withRange(Calendar);

export default function ExampleInfiniteCalendar({ navigation }) {
  return (
    <ScreenContainer>
      <InfiniteCalendar width={windowWidth} height={windowHeight} Component={CalendarWithRange} />
    </ScreenContainer>
  );
}
