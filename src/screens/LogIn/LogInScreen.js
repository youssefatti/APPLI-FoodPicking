import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import { styles } from "./StylesLogIn";
import axios from "axios";

export default class LogIn extends React.Component {
  // static propTypes = {
  //   mail: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired,
  //   navigation: PropTypes.object
  // };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "white",
      borderBottomWidth: 0
    }
  };

  state = {
    email: "johndoe4@gmail.com",
    password: "azerty",
    username: "",
    passwordConfirmation: "azerty",
    data: null,
    showLogin: true,
    showSignUp: false
  };

  signUpUser = (email, password, username, cb) => {
    axios
      .post("https://foodpacking-serveur.herokuapp.com/api/user/sign_up", {
        email,
        password,
        username
      })
      .then(function(response) {
        console.log(response);
        cb(response);
      })
      .catch(function(error) {
        console.log(error);
        alert("Log in incorrect");
      });
  };

  logInUser = (email, password, cb) => {
    console.log("email : ", email);
    console.log("password : ", password);

    console.log("this.state email : ", this.state.email);
    console.log("this.state password : ", this.state.password);

    axios
      .post("https://foodpacking-serveur.herokuapp.com/api/user/log_in", {
        email,
        password
      })
      .then(function(response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function(error) {
        console.log(error.response);
        console.log("response dans error : ", error.response.data.error);
        alert(error.response.data.error);
      });
  };

  toggleLoginSignUp = () => {
    this.setState({
      showLogin: !this.state.showLogin,
      showSignUp: !this.state.showSignUp
    });
  };

  _renderLogin = () => {
    const { navigate } = this.props.navigation;
    if (this.state.showLogin) {
      return (
        // <View
        //   style={{
        //     flex: 1,
        //     alignSelf: "center"
        //   }}
        // >
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: "space-around"
          }}
        >
          <TextInput
            style={{
              borderColor: "black",
              borderBottomWidth: 1,
              fontSize: 25,
              paddingLeft: 10,
              width: 200,
              height: 50,
              color: "black"
            }}
            // keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={{
              borderColor: "black",
              borderBottomWidth: 1,
              fontSize: 25,
              paddingLeft: 10,
              width: 200,
              height: 50,
              color: "black"
            }}
            secureTextEntry="true"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25
            }}
            onPress={() => {
              this.logInUser(this.state.email, this.state.password, data => {
                navigate("Home", { navigation: this.props.navigation });
                this.setState({ data });
              });
            }}
            data={this.state.data}
          >
            <Text
              style={{
                color: "black",
                backgroundColor: "white",
                width: 200
              }}
            >
              {" "}
              Login{" "}
            </Text>
          </TouchableOpacity>
        </View>
        //</View>
      );
    }
  };

  _renderSignUp = () => {
    const { navigate } = this.props.navigation;
    if (this.state.showSignUp) {
      return (
        <View>
          <TextInput
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              fontSize: 25,
              paddingLeft: 10,
              width: 200,
              height: 50,
              color: "white"
            }}
            keyboardType="default"
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              fontSize: 25,
              paddingLeft: 10,
              width: "80%",
              height: 50,
              color: "white"
            }}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              fontSize: 25,
              paddingLeft: 10,
              width: "80%",
              height: 50,
              color: "white"
            }}
            secureTextEntry="true"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TextInput
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              fontSize: 25,
              paddingLeft: 10,
              width: "80%",
              height: 50,
              color: "white"
            }}
            secureTextEntry="true"
            onChangeText={passwordConfirmation =>
              this.setState({ passwordConfirmation })
            }
            value={this.state.passwordConfirmation}
          />

          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              marginBottom: 100
            }}
            onPress={() => {
              if (this.state.password === this.state.passwordConfirmation) {
                this.signUpUser(
                  this.state.email,
                  this.state.password,
                  this.state.username,
                  data => {
                    navigate("Home", { navigation: this.props.navigation });
                    this.setState({ data });
                  }
                );
              } else {
                alert("the password are not the same");
              }
            }}
            data={this.state.data}
          >
            <Text
              style={{
                color: "black",
                backgroundColor: "white"
              }}
            >
              {" "}
              Sign Up{" "}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    console.log("LogInScreen is rendering");
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>FoodPicking</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white"
            }}
            disabled={this.state.showSignUp}
            //title="Sign Up"
            onPress={() => {
              this.toggleLoginSignUp();
            }}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.state.showLogin}
            //title="Login"
            onPress={() => {
              this.toggleLoginSignUp();
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2
          }}
        >
          {this.state.showLogin ? this._renderLogin() : this._renderSignUp()}
        </View>
      </View>
    );
  }
}
