import React, { useState } from 'react';
import { Button, Modal, Text } from 'react-native';
import ScreenContainer from '@src/components/screen-container';

export default function ExamplePullRefresh() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenContainer>
      <Button title="show modal" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Text>modal content</Text>

        <Button title="close modal" onPress={() => setModalVisible(false)} />
      </Modal>
    </ScreenContainer>
  );
}
