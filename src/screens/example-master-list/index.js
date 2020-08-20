import React from 'react';
import { Text, Button } from 'react-native';
import ScreenContainer from '@src/components/screen-container';

export default function GlobalState({ navigation }) {
  return (
    <ScreenContainer>
      <Text>{JSON.stringify(userInfo, null, 4)}</Text>
      <Button title="update user info" onPress={handlePress} />
    </ScreenContainer>
  );
}
