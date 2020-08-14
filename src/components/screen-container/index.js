import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
});

export default function ScreenContainer(props) {
  return (
    <View style={[styles.containerView, props.style]}>
      <SafeAreaView style={styles.safeView}>{props.children}</SafeAreaView>
    </View>
  );
}
