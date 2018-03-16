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
const styles = StyleSheet.create(AppStyle);
import Stripe from "react-native-stripe-api";
import axios from "axios";
/* const styles = StyleSheet.create(AppStyle); */
export default class Cart extends React.Component {
  static navigationOptions = {
    header: null
  };
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
    const arrCart = [];
    for (let i = 0; i < this.props.navigation.state.params.items.length; i++) {
      arrCart.push(
        <Text>
          {this.props.navigation.state.params.items[i].quantity}x{" "}
          {this.props.navigation.state.params.items[i].name}{" "}
          {(
            this.props.navigation.state.params.items[i].raw_price *
            this.props.navigation.state.params.items[i].quantity
          ).toFixed(2)}€ ||
        </Text>
      );
    }
    console.log("items", this.props.navigation.state.params.items);
    console.log("heure conf", this.props.navigation.state.params.chosenHour);
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Commande est confirmée.</Text>
        <Text>Voici le récapitulatif de votre commande</Text>
        <Text>
          total : {this.props.navigation.state.params.amount.toFixed(2)}
        </Text>
        <Text>items : {arrCart}</Text>
        <Text>heure : {this.props.navigation.state.params.chosenHour}</Text>
        {/* <TouchableOpacity onPress={() => navigate("")}>
          <Text>back</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
