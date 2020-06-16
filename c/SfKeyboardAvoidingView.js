import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import useLight from '~/h/useLight';

export default function SfKeyboardAvoidingView(props) {
  const { backgrounds } = useLight();
  return (
    <KeyboardAvoidingView
      style={{ ...styles.container, backgroundColor: backgrounds[0] }}
      {...(Platform.OS === 'ios' && { behavior: 'padding' })}
      enabled
      keyboardVerticalOffset={props.keyboardVerticalOffset || 20}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
