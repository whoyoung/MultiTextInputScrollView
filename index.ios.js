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
  ScrollView,
  Keyboard,
  Dimensions
} from 'react-native';
console.disableYellowBox = true;

let screenHeight = Dimensions.get('window').height;
let rowHeight = 50;
export default class MultiTextInputScrollView extends Component {
  constructor(props) {
    super(props);
    this.contentHeight = 0;
    this.moveH = 0;
    this.focus = null;
    this.needMove = false;
    this.inputs = this._inputArray(10);
    this.moveHeight = 0;
  }

  componentDidMount() {
    this.subscriptions = [
      Keyboard.addListener('keyboardDidShow', this._keyboardDidShow),
      Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove());
  }

  _keyboardDidShow = (e) => {
    if (!this.focus || !this.refs[this.focus]) return;
    this.needMove = false;
    this.refs[this.focus].measure((ox, oy, w, h, px, py) => {
      let leftHeight = screenHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）
      if (leftHeight < e.startCoordinates.height + rowHeight) {
        this.needMove = true;
        this.moveHeight = e.startCoordinates.height + rowHeight - leftHeight;
        this._scrollViewTo(this.moveH + this.moveHeight);
      }
    });
  }

  _keyboardDidHide = () => {
    if (this.needMove || this.moveHeight) {
      this._scrollViewTo(this.moveH);
    }
    this.focus = null;
  }

  _scrollViewTo(offsetY) {
    this.refs.scroll.scrollTo({ y: offsetY, animated: true });
  }

  _inputArray(rowNum) {
    if (rowNum < 1) return null;
    let tempArray = [];
    for (let index = 0; index < rowNum; index++) {
      let tag = 'input' + index;
      tempArray.push(
        <TextInput style={styles.inputStyle} onFocus={() => { this.focus = tag }}
          autoFocus={false} multiline={true} ref={tag} placeholder={tag} placeholderTextColor='gray'
        />
      )
    }
    return tempArray;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled' ref='scroll'
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.contentHeight = parseInt(contentHeight);
        }}
        onScrollEndDrag={(e) => {
          this.moveH = e.nativeEvent.targetContentOffset.y;
          this.moveHeight = 0;
          console.log('nativeEvent==' + JSON.stringify(e.nativeEvent));
        }}
      >
        {this.inputs}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    paddingTop: 20
  },
  inputStyle: {
    height: rowHeight,
    margin: 10,
    textAlign: 'left',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MultiTextInputScrollView', () => MultiTextInputScrollView);
