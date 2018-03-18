import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  TouchableHighlight,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import AppStyle from "../../../AppStyle";
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
    return [
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
      </View>,
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
      // <View>
      //   <View>
      //     <Image
      //       style={{ width: "100%", height: "100%", blur: 5 }}
      //       source={{
      //         uri:
      //           "https://i.pinimg.com/564x/90/39/15/903915f67ac95df8319e494d686446bb.jpg"
      //       }}
      //     />
      //   </View>

      //   <View
      //     style={{
      //       position: "absolute",
      //       justifyContent: "center",
      //       alignItems: "center",
      //       width: "100%",
      //       height: "100%"
      //     }}
      //   >
      //     {/* <Text
      //       style={{
      //         position: "absolute",
      //         color: "white",
      //         fontWeight: "bold",
      //         fontSize: 40
      //       }}
      //     >
      //       BONJOUUUUUR
      //     </Text>
      //   </View>
      // </View> */}
    ];
  }
}
