import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  TouchableHighlight,
  TextInput
} from "react-native";
import AppStyle from "../../AppStyle";
import Stripe from "react-native-stripe-api";
import axios from "axios";
/* const styles = StyleSheet.create(AppStyle); */
export default class Cart extends React.Component {
  state = {
    cart: this.props.navigation.state.params.cart,
    isValidateOrderVisible: true,
    modalVisible: false,
    isPopupVisible: false,
    number: "",
    expMonth: "",
    expYear: "",
    CVC: ""
  };
  pay() {
    const apiKey = "pk_test_hI9eMiVH1jgYGC8JF7uiEIkr";
    const client = new Stripe(apiKey);
    client
      .createToken({
        number: this.state.number,
        exp_month: this.state.expMonth,
        exp_year: this.state.expYear,
        cvc: this.state.CVC
      })
      .then(
        // { token },
        resp => {
          console.log("resp", resp);
          alert("Votre commande a bien été prise en compte");
          const token = resp;
          const total = this.props.navigation.state.params.amount;
          axios
            .post("https://8e47f037.ngrok.io/payment", {
              token,
              total
            })
            .then(function(resp) {
              console.log(resp);
            })
            .catch(function(error) {
              console.log(error);
              console.log("axios", token);
              console.log("axios", total);
            });
          console.log("token", token);
        }
      )
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    console.log("number", this.state.number);
    // console.log("cart", this.props.navigation.state.params);
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Recap</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "red"
  },
  button: {
    height: 100,
    width: 200,
    backgroundColor: "yellow"
  }
});
