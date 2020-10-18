import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Button, Loading } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
// import cookie from "react-cookies";
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.withCredentials = true
// axios.defaults.adapter = require('axios/lib/adapters/http')

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            error: '',
            loading: false
        };

        this.registerUser = this.registerUser.bind(this);
        this.onRegistrationFail = this.onRegistrationFail.bind(this);
    }

    async registerUser() {
      const { username, email, password1, password2 } = this.state;
      this.setState({ error: '', loading: true });
      console.log(password1);
      axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', 
      {
          username: username,
          email: email,
          password1: password1,
          password2: password2,
          //'access_token': 'EAALMbs7WCq4BAO1IxYmWe9sn0l40ZBwB5Qr0KwDwVYLwiRp7s3VUv5LGoSxNGajTLXSf2975yDJxXtZBCwPFRNlrhcUXn3cAQwrFqCeo9XXWGGZCHOO29NqCAZBVbJQz6ZCjW6p5CtNuWkU86wFYueUURyH7ifiHu8mc1BKt5mkminQld2pXRHGs7UDbeSWfPR2lMzlrtTgZDZD',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
         }
      }
      )
      .then((response) => {
        deviceStorage.saveItem("id_token", response.data.access_token);
        this.props.newJWT(response.data.access_token);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.onRegistrationFail();
      });
    }

    onRegistrationFail() {
      this.setState({
        error: 'Registration Failed',
        loading: false
      });
    }


  


    async handleSubmit(event) {
      event.preventDefault();

      // const csrftoken = cookie.load("csrftoken")
      try {
        //axios.defaults.withCredentials = true;
        

        axios.post(
          'http://192.168.1.6:8000/dj-rest-auth/registration/', 
          {
            //'access_token': 'EAALMbs7WCq4BAO1IxYmWe9sn0l40ZBwB5Qr0KwDwVYLwiRp7s3VUv5LGoSxNGajTLXSf2975yDJxXtZBCwPFRNlrhcUXn3cAQwrFqCeo9XXWGGZCHOO29NqCAZBVbJQz6ZCjW6p5CtNuWkU86wFYueUURyH7ifiHu8mc1BKt5mkminQld2pXRHGs7UDbeSWfPR2lMzlrtTgZDZD',
              'username': 'adtttin',
              'email': 'usttme@test.com',
              'password1': 'siren12345iu',
              'password2': 'siren12345iu',
          },
          {
             headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              //"X-CSRFTOKEN": 'XSRF-TOKEN',
              
             },
          },
            
      ).then(function (response) {
        console.log("-------------------------------------------------------------");
        console.log(response);
        // console.log(key);
        console.log("-------------------------------------------------------------");
        // console.log(response.data.refresh_token);
        console.log("-------------------------------------------------------------");
        //console.log(response);
      });
      } catch (error) {
          throw error;
        }
      };

    async handleGETSubmit(event) {
      event.preventDefault();
      
      try {
        axios.get('http://192.168.1.6:8000/dj-rest-auth/user/')
        .then((response) => {
          console.log(response.data);
          console.log("-------------------------------------------------------------");
          // console.log("-------------------------------------------------------------");
          // console.log("-------------------------------------------------------------");
          // console.log(response);
        });
      } catch (error) {
          throw error;
        }
      };

    render() {
        const {username, email, password1, password2, error, loading } = this.state;
        const { form, section, errorTextStyle } = styles;

        return (
          <Fragment>
            
            <View style={form}>

              <View style={section}>
                <Input
                  placeholder="username"
                  label="Username"
                  value={username}
                  onChangeText={username => this.setState({ username })}
                />
              </View>
              <View style={section}>
                <Input
                  placeholder="user@email.com"
                  label="Email"
                  value={email}
                  onChangeText={email => this.setState({ email })}
                />
              </View>
              <View style={section}>
                <Input
                  secureTextEntry
                  placeholder="password"
                  label="Password"
                  value={password1}
                  onChangeText={password1 => this.setState({ password1 })}
                />
              </View>
              <View style={section}>
                <Input
                  secureTextEntry
                  placeholder="confirm password"
                  label="Confirm Password"
                  value={password2}
                  onChangeText={password2 => this.setState({ password2 })}
                />
              </View>

              <Text style={errorTextStyle}>
                {error}
              </Text>

              {!loading ?
                <Button onPress={this.registerUser}>
                  Register
                </Button>
                :
                <Loading size={'large'} />
              }

            </View>
            <TextLink onPress={this.props.authSwitch}>
              Already have an account? Log in!
            </TextLink>

        </Fragment>
          
        );
    }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

export { Registration };