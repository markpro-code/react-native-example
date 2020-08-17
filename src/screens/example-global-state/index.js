import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import ScreenContainer from '@src/components/screen-container';
import { GlobalStateContext } from '@src/services/contexts';

export default function GlobalState({ navigation }) {
  const { userInfo, setGlobalState } = useContext(GlobalStateContext);

  const handlePress = () => {
    setGlobalState(preState => ({ ...preState, userInfo: { name: 'New Name' } }));
  };

  return (
    <ScreenContainer>
      <Text>{JSON.stringify(userInfo, null, 4)}</Text>
      <Button title="update user info" onPress={handlePress} />
    </ScreenContainer>
  );
}
