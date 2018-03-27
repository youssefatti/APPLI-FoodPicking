import React from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import moment from "moment";
import CountDown from "react-native-countdown-component";

import StyleAccount from "./StyleAccount";
const styles = StyleSheet.create(StyleAccount);

import Icon from "react-native-vector-icons/Ionicons";
Moment.globalFormat = "DD/MM/YYYY";
export default class Account extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Mon compte",
    headerTintColor: "#7FC149",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "white",
      borderBottomWidth: 0
    }
  });

  state = {
    orders: null
  };

  componentDidMount() {
    console.log("Will mount restaurants Page ");
    const id = this.props.navigation.state.params.data.data._id;
    console.log("data: ", id);

    axios

      .get(`https://foodpacking-serveur.herokuapp.com/api/orders/${id}`)
      .then(response => {
        this.setState({ orders: response.data });
        console.log("bouh", this.state.orders);
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
            const splice = order._id
              .split("")
              .slice(18, 25)
              .join("");
            return (
              <View style={styles.container}>
                <View style={styles.historic}>
                  <View style={styles.date}>
                    <Moment element={Text}>{order.created_at}</Moment>
                  </View>

                  <View style={styles.namePrice}>
                    <Text style={styles.twenty}>{order.restaurantName}</Text>
                    <Text
                      style={
                        (styles.twenty,
                        {
                          fontFamily: "Lato-Bold",
                          color: "#7FC149"
                        })
                      }
                    >
                      {parseFloat(order.total).toFixed(2)} €
                    </Text>
                  </View>

                  <Text style={styles.numberOrder}>
                    N° de commande : {splice}
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
          <Icon name="ios-restaurant" size={40} color="#7FC149" />
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
          <Icon name="ios-heart" size={40} color="#7FC149" />
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
          <Icon name="ios-list-box" size={40} color="#7FC149" />
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
          <Icon name="ios-person" size={40} color="#7FC149" />
        </TouchableOpacity>
      </View>
    ];
  }
}
