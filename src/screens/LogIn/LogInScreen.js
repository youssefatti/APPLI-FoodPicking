import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { Bubbles } from "react-native-loader";
import { styles } from "./StylesLogIn";
import axios from "axios";

export default class LogIn extends React.PureComponent {
  // Check the type of variable

  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    passwordConfirmation: PropTypes.string,
    navigation: PropTypes.object,
    showLogin: PropTypes.bool,
    showSignUp: PropTypes.bool,
    username: PropTypes.string
  };

  // Navigator option

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "rgb(243,243,243)",
      borderBottomWidth: 0
    }
  };

  // Intialization of states

  state = {
    email: "johndoe4@gmail.com",
    password: "azerty",
    username: "Username",
    passwordConfirmation: "azerty",
    data: null,
    showLogin: true,
    showSignUp: false
    //isLoading: false will be used for the loader
  };

  // Send request to server for Sign up

  signUpUser = (email, password, username, cb) => {
    axios
      .post("https://foodpacking-serveur.herokuapp.com/api/user/sign_up", {
        email,
        password,
        username
      })
      .then(function(response) {
        //console.log(response);
        cb(response);
      })
      .catch(function(error) {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  // Send request to server and check authorisation

  logInUser = (email, password, cb) => {
    axios
      .post("https://foodpacking-serveur.herokuapp.com/api/user/log_in", {
        email,
        password
      })
      .then(function(response) {
        //console.log(response);
        cb(response);
      })
      .catch(function(error) {
        //console.log(error.response);
        alert(error.response.data.error);
      });
  };

  // Toggle between Sign up and Login it's booleen value to check which one is selected

  toggleLoginSignUp = () => {
    this.setState({
      showLogin: !this.state.showLogin,
      showSignUp: !this.state.showSignUp
    });
  };

  // Render Login View or Sign up

  _renderToggleLoginSignUp = () => {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.SingUpLoginContain}>
        {!this.state.showLogin ? (
          <TextInput
            style={styles.inputText}
            keyboardType="default"
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        ) : null}

        <TextInput
          style={styles.inputText}
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.inputText}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {!this.state.showLogin ? (
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={passwordConfirmation =>
              this.setState({ passwordConfirmation })
            }
            value={this.state.passwordConfirmation}
          />
        ) : null}

        {!this.state.showLogin ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (this.state.password === this.state.passwordConfirmation) {
                this.signUpUser(
                  this.state.email,
                  this.state.password,
                  this.state.username,
                  data => {
                    navigate("Home", {
                      navigation: this.props.navigation,
                      userId: this.state.userId
                    });
                    this.setState({ data });
                  }
                );
              } else {
                alert("the password are not the same");
              }
            }}
            data={this.state.data}
          >
            <Text style={styles.textButton}> Sign Up </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.logInUser(this.state.email, this.state.password, data => {
                navigate("Home", {
                  navigation: this.props.navigation
                });
                this.setState({ data });
              });
            }}
            data={this.state.data}
          >
            <Text style={styles.textButton}>{this.state.isLoading} Login </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render() {
    console.log("rendering login screen");
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../Images/order-pick-up.png")}
            style={{ flex: 1, resizeMode: "contain" }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text style={styles.foodPicking}>FoodPicking</Text>
          </View>
        </View>

        <View style={styles.signUpLoginView}>
          <TouchableOpacity
            style={
              this.state.showLogin
                ? styles.toggleTouchLogin
                : styles.toggleTouchSignUp
            }
            disabled={this.state.showSignUp}
            onPress={() => {
              this.toggleLoginSignUp();
            }}
          >
            <Text
              style={
                this.state.showLogin
                  ? styles.toggleTextLogin
                  : styles.toggleTextSignUp
              }
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.showLogin
                ? styles.toggleTouchSignUp
                : styles.toggleTouchLogin
            }
            disabled={this.state.showLogin}
            onPress={() => {
              this.toggleLoginSignUp();
            }}
          >
            <Text
              style={
                this.state.showLogin
                  ? styles.toggleTextSignUp
                  : styles.toggleTextLogin
              }
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 2
          }}
        >
          {this._renderToggleLoginSignUp()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
