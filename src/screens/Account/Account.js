import React from "react";
import axios from "axios";

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import StyleAccount from "./StyleAccount";
const styles = StyleSheet.create(StyleAccount);

import Icon from "react-native-vector-icons/Ionicons";

export default class Account extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Mon compte"
  });

  state = {
    orders: null
  };

  componentWillMount() {
    console.log(this.props.navigation.state.params);

    console.log("Will mount restaurants Page ");
    const id = this.props.navigation.state.params.data.data._id;
    console.log("data: ", id);

    axios

      .get(`https://foodpacking-serveur.herokuapp.com/api/orders/${id}`)
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return [
      <ScrollView style={{ backgroundColor: "white" }}>
        <Text style={styles.orders}>Mes Commandes</Text>
        {this.state.orders === null || undefined ? (
          <View>
            <Text />
          </View>
        ) : (
          this.state.orders.orders.map((order, index) => {
            return (
              <View style={styles.container}>
                <View style={styles.historic}>
                  <View style={styles.namePrice}>
                    <Text style={styles.twenty}>{order.restaurantName}</Text>
                    <Text style={styles.twenty}>
                      {parseFloat(order.total).toFixed(2)} €
                    </Text>
                  </View>

                  <Text style={styles.numberOrder}>
                    N° de commande : {order._id}
                  </Text>
                </View>
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
