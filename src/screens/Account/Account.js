import React from "react";
import axios from "axios";

import {
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View
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
    let hour = this.props.navigation.state.params.hour;
    let geohash = this.props.navigation.state.params.geoloc;
    axios
      .get("http://localhost:3000/api/orders/5aaabb6f62c9f698cbd7f25c")
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
    // récupération du nom et de la photo
    const arrResto = [];

    return (
      <View>
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
      </View>
    );
    //     <ScrollView style={[styles.containerIn, styles.style, styles.userSpace]}>
    //       <View style={styles.bloc}>
    //         // affichage des éléments
    //         {this.state.length === this.state.restaurants.length ? (
    //           <View>{arrResto}</View>
    //         ) : (
    //           <ActivityIndicator
    //             size="large"
    //             color="#FBB252"
    //             style={{ alignSelf: "center", flex: 1 }}
    //           />
    //         )}
    //       </View>
    //     </ScrollView>,

    //     <View style={styles.UserNav}>
    //       <TouchableOpacity
    //         onPress={() =>
    //           navigate("Restaurants", {
    //             name: "Restaurant",
    //             geoloc: this.props.navigation.state.params.geoloc,
    //             hour: this.props.navigation.state.params.hour,
    //             pick: this.props.navigation.state.params.pick,
    //             arrChoose: this.props.navigation.state.params.arrChoose
    //           })
    //         }
    //       >
    //         <Icon name="ios-restaurant" size={60} color="#fff" />
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={() =>
    //           navigate("Favorites", {
    //             name: "Favorites",
    //             geoloc: this.props.navigation.state.params.geoloc,
    //             hour: this.props.navigation.state.params.hour,
    //             pick: this.props.navigation.state.params.pick,
    //             arrChoose: this.props.navigation.state.params.arrChoose
    //           })
    //         }
    //       >
    //         <Icon name="ios-heart" size={60} color="#fff" />
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={() =>
    //           navigate("Account", {
    //             name: "Account",
    //             geoloc: this.props.navigation.state.params.geoloc,
    //             hour: this.props.navigation.state.params.hour,
    //             pick: this.props.navigation.state.params.pick,
    //             arrChoose: this.props.navigation.state.params.arrChoose
    //           })
    //         }
    //       >
    //         <Icon name="ios-contact" size={60} color="#fff" />
    //       </TouchableOpacity>
    //     </View>
    //   ];
  }
}
