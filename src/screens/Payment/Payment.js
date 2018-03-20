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
import AppStyle from "../../../AppStyle";
const styles = StyleSheet.create(AppStyle);

import Icon from "react-native-vector-icons/Ionicons";

import PaymentStyles from "./PaymentStyles";
const paymentStyles = StyleSheet.create(PaymentStyles);
import Stripe from "react-native-stripe-api";
import axios from "axios";
/* const styles = StyleSheet.create(AppStyle); */

export default class Payment extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Paiement",
    headerBackTitle: null
  });
  state = {
    cart: this.props.navigation.state.params.cart,
    isValidateOrderVisible: true,
    modalVisible: false,
    isPopupVisible: false,
    number: "4242424242424242",
    expMonth: "11",
    expYear: "21",
    CVC: "111",
    chosenHour: this.props.navigation.state.params.chosenHour,
    titulaire: "",
    token: null
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
      .then(resp => {
        const token = resp;
        const total = this.props.navigation.state.params.amount;

        axios
          .post("https://foodpacking-serveur.herokuapp.com/api/payment/order", {
            items: this.props.navigation.state.params.items,
            token,
            total,
            chosenHour: this.state.chosenHour,
            data: this.props.navigation.state.params.data.data._id,
            restaurantName: this.props.navigation.state.params.restaurantName
          })
          .then(resp => {
            this.setState({ token: resp.data });
            alert("Votre commande a bien été prise en compte");
          })
          .catch(function(error) {
            console.log(error);
            console.log("axios", token);
            console.log("axios", total);
            alert("erreur");
          });
        console.log("token", token);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("chosenHour", this.state.token);
    console.log("item", this.props.navigation.state.params.items);
    return [
      <View style={paymentStyles.payment}>
        <View style={[paymentStyles.paymentTitle, paymentStyles.paymentIn]}>
          <Text style={[paymentStyles.footerText, paymentStyles.strong]}>
            Montant à régler :{" "}
            {this.props.navigation.state.params.amount.toFixed(2)} €
          </Text>
        </View>
        <View style={[paymentStyles.payment, paymentStyles.center]}>
          <Icon name="ios-card" size={100} color="#7FC149" />

          <View style={paymentStyles.left}>
            <TextInput
              placeholder="Nom du titulaire"
              style={[
                paymentStyles.numCard,
                paymentStyles.paymentIn,
                paymentStyles.air
              ]}
              onChangeText={titulaire => this.setState({ titulaire })}
              value={this.state.titulaire}
            />
            <TextInput
              placeholder="N° de carte"
              // value={"4242424242424242"}
              style={[
                paymentStyles.numCard,
                paymentStyles.paymentIn,
                paymentStyles.air
              ]}
              onChangeText={number => this.setState({ number })}
              value={this.state.number}
            />
            <View style={[paymentStyles.row, paymentStyles.paymentIn]}>
              <TextInput
                placeholder="MM"
                // value={"09"}
                style={[paymentStyles.input, paymentStyles.air]}
                onChangeText={expMonth => this.setState({ expMonth })}
                value={this.state.expMonth}
              />
              <TextInput
                placeholder="AA"
                // value={"18"}
                style={[paymentStyles.input, paymentStyles.air]}
                onChangeText={expYear => this.setState({ expYear })}
                value={this.state.expYear}
              />
              <TextInput
                placeholder="CVC"
                // value={"111"}
                style={[paymentStyles.input, paymentStyles.air]}
                onChangeText={CVC => this.setState({ CVC })}
                value={this.state.CVC}
              />
            </View>
          </View>
        </View>
      </View>,
      <View>
        <TouchableOpacity
          style={paymentStyles.footerButton}
          onPress={() => {
            this.pay();

            navigate("Confirmation", {
              name: "Confirmation",
              cart: this.state.cart,
              chosenHour: this.state.chosenHour,
              amount: this.props.navigation.state.params.amount,
              arrChoose: this.props.navigation.state.params.arrChoose,
              items: this.props.navigation.state.params.items,
              data: this.props.navigation.state.params.data,
              timeOrder: this.state.token
            });
          }}
        >
          <Text style={[paymentStyles.footerText, paymentStyles.strong]}>
            Confirmer et payer
          </Text>
        </TouchableOpacity>
      </View>
    ];
  }
}
