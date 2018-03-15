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
    let token;
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

          token = resp.id;

          console.log("token", token);
        }
      )
      .catch(err => {
        console.log(err);
      });
    // axios
    //   .post("https://2d2861a8.ngrok.io", {
    //     token,
    //     total: this.props.navigation.state.params.amount
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //     console.log("axios", token);
    //   });
  }

  render() {
    console.log("number", this.state.number);
    // console.log("cart", this.props.navigation.state.params);
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>PAIEMENT</Text>
        <TextInput
          placeholder="N° de carte"
          // value={"4242424242424242"}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%"
          }}
          onChangeText={number => this.setState({ number })}
          value={this.state.number}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="MM"
            // value={"09"}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: "40%"
            }}
            onChangeText={expMonth => this.setState({ expMonth })}
            value={this.state.expMonth}
          />
          <TextInput
            placeholder="AA"
            // value={"18"}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: "40%"
            }}
            onChangeText={expYear => this.setState({ expYear })}
            value={this.state.expYear}
          />
        </View>
        {/* <TextInput
          placeholder="Nom du titulaire de la carte"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%"
          }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        /> */}
        <TextInput
          placeholder="CCV"
          // value={"111"}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "30%"
          }}
          onChangeText={CVC => this.setState({ CVC })}
          value={this.state.CVC}
        />
        <Button
          title="Confirmer et payer"
          onPress={() => {
            this.pay();

            navigate("Confirmation", {
              name: "Confirmation",
              amount: this.state.cart
            });
          }}
        />
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
