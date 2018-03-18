import React from "react";
import axios from "axios";

import { StyleSheet, ScrollView, Text, View } from "react-native";
import AppStyle from "../../../AppStyle";
const styles = StyleSheet.create(AppStyle);
import StyleAccount from "./StyleAccount";
const styleAccount = StyleSheet.create(StyleAccount);
import Icon from "react-native-vector-icons/Ionicons";

const resto = {};

export default class Account extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: navigation.state.params.name
  // });

  static navigationOptions = ({ navigation }) => ({
    title: "Account"
  });

  state = {
    orders: null
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.restaurants === nextProps.restaurants) {
  //     return false;
  //   }
  //   return true;
  // }

  componentWillMount() {
    console.log("Will mount restaurants Page ");
    const id = this.props.navigation.state.params.data.data._id;

    axios
      .get(`http://foodpacking-serveur.herokuapp.com/api/orders/${id}`)
      .then(response => {
        this.setState({ orders: response.data });
        console.log("acount", response.data.orders);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("data: ");

    return (
      <ScrollView>
        <Text>Hello</Text>
        {this.state.orders === null ? (
          <View>
            <Text />
          </View>
        ) : (
          this.state.orders.orders.map((order, index) => {
            return (
              <View>
                <Text>{order.restaurantName}</Text>
                <Text>{parseFloat(order.total).toFixed(2)} €</Text>
                <Text>N° de commande : {order._id}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    );
  }
}
