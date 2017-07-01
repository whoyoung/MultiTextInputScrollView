/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  ScrollView
} from 'react-native';

export default class MultiTextInputScrollView extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag' 
      keyboardShouldPersistTaps='handled'
      >
        <TextInput style={styles.inputStyle} 
        autoFocus={false} multiline={true} ref='input1'
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    paddingTop:20
  },
  inputStyle: {
    height:50, 
    margin: 10,
    textAlign:'left',
    borderColor:'gray',
    borderRadius:5,
    borderWidth:1,
    paddingHorizontal:5
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MultiTextInputScrollView', () => MultiTextInputScrollView);
