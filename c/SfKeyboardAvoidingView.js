import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import useLight from '~/h/useLight';
import { SafeAreaView } from 'react-native';

export default function SfKeyboardAvoidingView(props) {
  const { backgrounds } = useLight();
  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: backgrounds[0] }}
    >
      <KeyboardAvoidingView
        {...(Platform.OS === 'ios' && { behavior: 'padding' })}
        enabled
        keyboardVerticalOffset={props.keyboardVerticalOffset || 20}
        style={{ flex: 1 }}
      >
        {props.children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
