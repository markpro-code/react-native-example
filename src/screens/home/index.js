import React , { useContext } from 'react'
import { Text, Button } from 'react-native';
import ScreenContainer from '@src/components/screen-container';
import { GlobalStateContext } from '@src/services/contexts'
// import ScreenContainer from '../../components/screen-container';
// import { styles } from './styles';

export default function Home() {
    const { userInfo, setGlobalState } = useContext(GlobalStateContext);
  return (
    <ScreenContainer>
      <Text>{JSON.stringify(userInfo, null, 4)}</Text>
      <Button title="click" onPress={() => setGlobalState({ userInfo: {username: 'click'} })} />
    </ScreenContainer>
  );
}

