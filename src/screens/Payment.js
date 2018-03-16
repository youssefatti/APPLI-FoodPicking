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

export default class Payment extends React.Component {
  state = {
    cart: this.props.navigation.state.params.cart,
    isValidateOrderVisible: true,
    modalVisible: false,
    isPopupVisible: false,
    number: "",
    expMonth: "",
    expYear: "",
    CVC: "",
    chosenHour: this.props.navigation.state.params.chosenHour
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
          const token = resp;
          const total = this.props.navigation.state.params.amount;
          axios
            .post(
              "https://foodpacking-serveur.herokuapp.com/api/payment/order",
              {
                items: this.props.navigation.state.params.items,
                token,
                total,
                chosenHour: this.state.chosenHour,
                data: this.props.navigation.state.params.data.data._id
              }
            )
            .then(function(resp) {
              console.log(resp);
              alert("Votre commande a bien été prise en compte");
            })
            .catch(function(error) {
              console.log(error);
              console.log("axios", token);
              console.log("axios", total);
              alert("erreur");
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
    console.log("chosenHour", this.state.chosenHour);
    console.log("item", this.props.navigation.state.params.items);
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
              cart: this.state.cart,
              chosenHour: this.state.chosenHour,
              amount: this.props.navigation.state.params.amount,
              arrChoose: this.props.navigation.state.params.arrChoose,
              items: this.props.navigation.state.params.items
            });
          }}
        />
      </View>
    );
  }
}
