import React from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import CountDown from "react-native-countdown-component";

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
    const timestamp = moment(roundedtime).unix();
    console.log("time", timestamp);
    const arrChoose = moment(this.props.navigation.state.params.hour).unix();
    console.log("arrch", arrChoose);
    console.log("couc", this.props.navigation.state.params.hour);
    return [
      <View>
        <CountDown
          timeToShow={["M", "S"]}
          digitBgColor={"#7FC149"}
          digitTxtColor={"white"}
          until={10}
          onFinish={() => alert("finished")}
          onPress={() => alert("hello")}
          size={20}
        />
        {/* <View>
          <Moment toNow>1976-04-19T12:59-0500</Moment>
          <time>40 years ago</time>
        </View>, */}
        <ScrollView>
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
            <Icon name="ios-restaurant" size={40} color="#2A4D49" />
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
            <Icon name="ios-heart" size={40} color="#2A4D49" />
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
            <Icon name="ios-contact" size={40} color="#2A4D49" />
          </TouchableOpacity>
        </View>
      </View>
    ];
  }
}
