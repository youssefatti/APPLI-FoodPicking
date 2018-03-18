import React from "react";
import axios from "axios";

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";
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
    console.log("data: ", id);

    axios

      .get(`https://foodpacking-serveur.herokuapp.com/api/orders/${id}`)
      .then(response => {
        console.log("data axios: ", id);

        this.setState({ orders: response.data });
        console.log("acount", response.data.orders);
      })
      .catch(function(error) {
        console.log(error);
        console.log("acount", response.data.orders);
        alert("bouf");
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return [
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
      </ScrollView>,
      <View style={styles.UserNav}>
        <TouchableOpacity
          onPress={() =>
            navigate("Restaurants", {
              name: "Restaurant",
              geoloc: this.props.navigation.state.params.geoloc,
              hour: this.props.navigation.state.params.hour,
              pick: this.props.navigation.state.params.pick,
              arrChoose: this.props.navigation.state.params.arrChoose,
              data: this.props.navigation.state.params.data
            })
          }
        >
          <Icon name="ios-restaurant" size={60} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigate("Favorites", {
              name: "Favorites",
              geoloc: this.props.navigation.state.params.geoloc,
              hour: this.props.navigation.state.params.hour,
              pick: this.props.navigation.state.params.pick,
              arrChoose: this.props.navigation.state.params.arrChoose,
              data: this.props.navigation.state.params.data
            })
          }
        >
          <Icon name="ios-heart" size={60} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigate("Account", {
              name: "Account",
              geoloc: this.props.navigation.state.params.geoloc,
              hour: this.props.navigation.state.params.hour,
              pick: this.props.navigation.state.params.pick,
              arrChoose: this.props.navigation.state.params.arrChoose,
              data: this.props.navigation.state.params.data
            })
          }
        >
          <Icon name="ios-contact" size={60} color="#fff" />
        </TouchableOpacity>
      </View>
    ];
  }
}
