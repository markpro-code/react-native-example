import React from 'react';
import ScreenContainer from '@src/components/screen-container';
import { List } from '@ant-design/react-native';

const Item = List.Item;

const screenList = [
  {
    route: 'ExamplePullRefresh',
    name: 'example: pull to refresh',
  },
  {
    route: 'ExampleGlobalState',
    name: 'example: global state',
  },
];

export default function Home({ navigation }) {
  return (
    <ScreenContainer>
      <List renderHeader="screen list">
        {screenList.map(item => (
          <Item arrow="horizontal" onPress={() => navigation.navigate(item.route)}>
            {item.name}
          </Item>
        ))}
      </List>
    </ScreenContainer>
  );
}
