import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator
} from "react-native";

import { styles } from "./StylesLogIn";
import { commonStyles } from "../../../src/CommonStyles";
import axios from "axios";

import LinearGradient from "react-native-linear-gradient";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
let isLoad = null;

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
    header: null
  };

  // Intialization of states

  state = {
    email: "johndoe4@gmail.com",
    password: "azerty",
    username: "Username",
    passwordConfirmation: "azerty",
    data: null,
    showLogin: true,
    showSignUp: false,
    isLoading: false //will be used for the loader
  };

  componentWillMount() {
    console.log("Will Mount Login Screen");
    isLoad = true;
  }

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
        this.setState(
          {
            isLoading: false
          },
          () => {
            alert(error.response.data.error);
          }
        );
        //console.log(error);
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
      .catch(error => {
        this.setState(
          {
            isLoading: false
          },
          () => {
            alert(error.response.data.error);
          }
        );
        //console.log(error.response);
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
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
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
        </View>
        <View
          style={{
            justifyContent: "flex-end"
          }}
        />
        {!this.state.showLogin ? (
          <TouchableOpacity
            style={commonStyles.buttonBis}
            disabled={this.state.isLoading ? true : false}
            onPress={() => {
              this.setState({
                isLoading: true
              });
              if (this.state.password === this.state.passwordConfirmation) {
                this.signUpUser(
                  this.state.email,
                  this.state.password,
                  this.state.username,
                  data => {
                    this.setState({ data });
                    navigate("Home", {
                      data: this.state.data,
                      navigation: this.props.navigation,
                      userId: this.state.userId
                    });
                  }
                );
              } else {
                this.setState({
                  isLoading: false
                });
                alert("the password are not the same");
              }
            }}
            data={this.state.data}
          >
            {this.state.isLoading ? (
              <ActivityIndicator size="large" color="white" style={{}} />
            ) : (
              <Text style={commonStyles.textButtonBis}>Créer un compte</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={commonStyles.buttonBis}
            disabled={this.state.isLoading ? true : false}
            onPress={() => {
              this.setState({
                isLoading: true
              });
              this.logInUser(this.state.email, this.state.password, data => {
                this.setState({ data });

                navigate("Home", {
                  data: this.state.data,
                  navigation: this.props.navigation
                });
              });
            }}
            data={this.state.data}
          >
            {this.state.isLoading ? (
              <ActivityIndicator size="large" color="white" style={{}} />
            ) : (
              <Text style={commonStyles.textButtonBis}>Se connecter</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render() {
    console.log("rendering login screen");
    console.log("isLoad : ", isLoad);
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={{
            flex: 1,
            width: width,
            height: height
          }}
          source={require("../../../Images/backgroundPhoto.jpeg")}
        >
          <LinearGradient colors={["#000000", "#a6000000"]} style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text style={commonStyles.foodPicking}>Food Picking</Text>
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: "space-around"
              }}
            >
              <View style={styles.signUpLoginView}>
                <View style={styles.signUpLoginViewFirst}>
                  <View style={styles.signUpLoginViewIn}>
                    <TouchableOpacity
                      style={
                        !this.state.showLogin
                          ? styles.toggleTouchLogin
                          : styles.toggleTouchSignUp
                      }
                      disabled={this.state.showLogin}
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
                        Se connecter
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        !this.state.showLogin
                          ? styles.toggleTouchSignUp
                          : styles.toggleTouchLogin
                      }
                      disabled={this.state.showSignUp}
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
                        Créer un compte
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-around"
                  }}
                >
                  {this._renderToggleLoginSignUp()}
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
