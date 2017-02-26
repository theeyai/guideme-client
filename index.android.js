/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPagerAndroid,
  Dimensions
} from 'react-native';

import PAWelcome from './pages/PAWelcome';
import PASearchResult from './pages/PASearchResult';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class GuideMeAndroid extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
          searchPhrase: ''
      };
  }

  onAskedAQuestion(phrase) {
    this.viewPager.setPage(1);
    this.search.doSearch(phrase);
  }

  render() {
    return (
      <ViewPagerAndroid style={styles.pager} ref={viewPager => { this.viewPager = viewPager; }} initialPage={0}>
        <View style={{flex:1}}>
          <PAWelcome  onAskedAQuestion={this.onAskedAQuestion.bind(this)}/>
        </View>
        <View style={{flex:1}}>
          <PASearchResult ref={search => {this.search = search}} />
        </View>
      </ViewPagerAndroid>
    );
  }
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  }
});

AppRegistry.registerComponent('GuideMeAndroid', () => GuideMeAndroid);
