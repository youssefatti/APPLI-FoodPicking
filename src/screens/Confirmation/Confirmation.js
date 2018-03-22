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
  TextInput,
  Time
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CountDown from "react-native-countdown-component";
import AppStyle from "./SyleConfirmation";
const styles = StyleSheet.create(AppStyle);
import Stripe from "react-native-stripe-api";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";

/* const styles = StyleSheet.create(AppStyle); */
export default class Cart extends React.Component {
  static navigationOptions = {
    title: "Confirmation",
    headerTintColor: "#7FC149",
    headerBackTitle: null,
    headerLeft: null
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
    const date = new Date();
    const timestamp = moment(
      date.getFullYear() +
        "-0" +
        parseInt(date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "T" +
        this.props.navigation.state.params.chosenHour
    ).unix();
    // console.log("time", timestamp);
    const time = moment(this.props.navigation.state.params.hour).unix();
    const diff = timestamp - time;
    // console.log("arrch", time);
    // console.log("tok", this.props.navigation.state.params.chosenHour);

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
    // console.log("items", this.props.navigation.state.params.items);
    // console.log("heure conf", this.props.navigation.state.params.chosenHour);
    const { navigate } = this.props.navigation;
    return [
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
            color: "black"
          }}
        >
          Votre commande est confirmée
        </Text>
        <Text style={{ color: "#4A4A4A" }}>
          Faites scanner ce code pour récupérer la commande
        </Text>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri:
                "https://camo.githubusercontent.com/c79f9b11d3b822c9648fd8e0fc9a646c8ac23f0b/68747470733a2f2f7261772e6769746875622e636f6d2f6d65746566696368612f6469616772616d732d7172636f64652f6d61737465722f6578616d706c65732f7172636f64652e706e67"
            }}
          />
        </View>
        {/* <View
          style={{
            borderWidth: 2,
            flexDirection: "row",
            width: "101%",
            justifyContent: "space-between",
            borderColor: "#979797"
          }}
        >
          <Text style={{ margin: 15, fontWeight: "bold" }}>Total :</Text>
          <Text style={{ margin: 15 }}>
            {" "}
            {this.props.navigation.state.params.amount.toFixed(2)}
          </Text>
        </View> */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "#4A4A4A"
            }}
          >
            Vous pouvez récupérer la commande dans :
          </Text>

          <CountDown
            style={{
              marginTop: 50
            }}
            timeToShow={diff < 3600 ? ["M", "S"] : ["H", "M", "S"]}
            digitBgColor={"#7FC149"}
            digitTxtColor={"white"}
            until={diff}
            onFinish={() => alert("C'est Prêt!")}
            onPress={() => alert("Patientez, c'est bientôt prêt!")}
            size={30}
          />
        </View>
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
      //         color: "#5C4CD0",
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
