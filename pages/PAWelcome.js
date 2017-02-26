import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';

let windowWidth = Dimensions.get('window').width

export default class PAWelcome extends Component {
	static propTypes = {
        onAskedAQuestion: PropTypes.func.isRequired
    };

    constructor(props) {
    	super(props);
    	this.state = {
    		phrase: ''
    	};
    }

    onTextChange(phrase) {
    	this.setState({phrase: phrase});
    }

    onSubmitChange() {
    	console.log('xxx');
    	this.props.onAskedAQuestion(this.state.phrase);
    }

	render() {
		return (
			<View style={styles.container}>
	          <Text style={styles.welcome}>
	            GuideMe
	          </Text>
	          <TextInput style={styles.search} 
	                     placeholder="Ask any questions" 
	                     returnKeyType="send"
	                     onChangeText={this.onTextChange.bind(this)}
	                     onSubmitEditing={this.onSubmitChange.bind(this)}
	          />
	        </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  search: {
    fontSize: 20,
    width: windowWidth * 0.8,
    textAlign: 'center',
  }
});