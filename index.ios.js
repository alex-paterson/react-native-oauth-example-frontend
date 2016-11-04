/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';

export default class OauthExample extends Component {
  _facebookLogin() {
    Linking.openURL([
      'https://graph.facebook.com/oauth/authorize',
      '?response_type=token',
      '&scope=email',
      '&client_id='+'1247676148624015',
      '&redirect_uri=fb1247676148624015://authorize'
    ].join(''));
  }
  componentDidMount() {
    Linking.addEventListener('url', (event) => {
      // This is all the login logic that takes place after the user is redirected
      // back to the app from the third party site.
      var facebookToken = event.url.split('#')[1].split('=')[1].split('&')[0];
      axios.post('http://localhost:3000/v1/facebook_auth', {token: facebookToken}).then((response) => {
        var token = response.data.token;
        // Save this token and use it for future protected API calls like this:

        // axios.get('http://localhost:3000/v1/protected', {headers: {authorization: token}}).then((res) => {
        //   console.log("Successfully made authenticated API call!!");
        // }).catch((err) => {
        //   console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._facebookLogin}>
          <Text style={styles.welcome}>
            Facebook Login!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('OauthExample', () => OauthExample);
