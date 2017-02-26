import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import io from 'socket.io-client/dist/socket.io';

let windowWidth = Dimensions.get('window').width

const socket = io('http://www.maeto-lay.com', {
  transports: ['websocket']
});

export default class PASearchResult extends Component {

	constructor(props) {
    	super(props);
    	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    	this.state = {
    		data: [],
    		answers: ds.cloneWithRows([])
    	};
    }

	doSearch(searchPhrase) {
		socket.emit('chat message', {
	        Name: "Test",
	        Message: searchPhrase
	    });
	}

	componentWillMount() {
		let self = this;
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        socket.on('chat message', function(msg){
        	let answers = self.state.data;
        	answers.push(msg);
        	self.setState({
        		data: answers,
        		answers: ds.cloneWithRows(answers)
        	})
        });
    }

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>
					Result	
				</Text>
				<ListView
				  style={{width: windowWidth}}
		          dataSource={this.state.answers}
		          enableEmptySections={true}
		          renderSectionHeader={(sectionData, sectionID) => <View key={sectionID} style={{
		          	height: 1,
		          	backgroundColor: '#CCCCCC',
		          }}></View>}
		          renderSeparator={(sectionID, rowID) => <View key={rowID} style={{
		          	height: 1,
		          	backgroundColor: '#CCCCCC',
		          }}></View>}
		          renderRow={(msg) => <View style={styles.answer}>
        			<View style={styles.answerLeft}>
        				<Image style={{width: 120, height: 120}} source={{uri: msg.ProfileImage}}/>
        			</View>
        			<View style={styles.answerRight}>
        				<Text style={styles.answerName}>
		        			{ msg.Name }:
		        		</Text>
		        		<Text style={styles.answerMessage}>
		        			{ msg.Message }
		        		</Text>
        			</View>
        		</View>}
		        />
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
  	flexDirection: 'column',
  	alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  answer: {
  	flexDirection: 'row',
  	flex: 1
  },
  answerLeft: {
  	flex: 0.3
  },
  answerRight: {
  	flex: 0.6
  },
  answerName: {

  },
  answerMessage: {
  }
});