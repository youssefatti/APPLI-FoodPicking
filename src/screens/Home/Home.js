import React from "react";
import axios from "axios";
import geo from "geo-hash";
import moment from "moment";

import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
  Picker
} from "react-native";

import { stylesHome } from "./StylesHome";

// import AppStyle from "../../../AppStyle";
// const styles = StyleSheet.create(AppStyle);

export default class Home extends React.PureComponent {
  static navigationOptions = {
    header: null
  };

  state = {
    error: null,
    geoloc: null,
    hour: null
  };

  // Optimizing the rendering page, if the geoloc state not changing then we don't rendering
  // instead we using PureComponent

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     //this.props.geoloc === nextProps.geoloc ||
  //     this.state.hour === nextProps.hour
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  // function to get geoloc and convert it to geohash

  getGeoLoc() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        let geohash = geo.encode(
          position.coords.latitude,
          position.coords.longitude
        );
        this.setState({
          geoloc: geohash,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillMount() {
    console.log("Did mount home page");
    this.getGeoLoc();
  }

  render() {
    console.log("rendering home page");

    /* PICKERS */
    const pickers = [];

    /* ON ARRONDIT L'HEURE ACTUELLE A 15 MIN SUPERIEURES */
    const rounded = Math.round(moment().minute() / 15) * 15;
    const roundedDown = Math.floor(moment().minute() / 15) * 15;
    const roundedUp = Math.ceil(moment().minute() / 15) * 15;

    roundedtime = moment()
      .minute(roundedUp)
      .second(0);

    const timestamp = moment(roundedtime).unix();
    const tonightTimestamp = moment(moment().endOf("day")).unix();

    for (let i = 0; i < Math.ceil((tonightTimestamp - timestamp) / 900); i++) {
      i > 0
        ? pickers.push(
            <Picker.Item
              key={i}
              label={moment((timestamp + i * 900) * 1000).format("HH:mm")}
              value={moment((timestamp + i * 900) * 1000).unix()}
            />
          )
        : null;
    }
    let chooseHour = null;
    let chooseHour1 = null;
    let chooseHour2 = null;
    let arrChoose = [];
    if (this.state.hour === null) {
      chooseHour = moment.unix(pickers[0].props.value).format("HH:mm");
      chooseHour1 = moment.unix(pickers[0].props.value + 900).format("HH:mm");
      chooseHour2 = moment.unix(pickers[0].props.value + 1800).format("HH:mm");
    } else {
      chooseHour = moment.unix(this.state.hour).format("HH:mm");
      chooseHour1 = moment.unix(this.state.hour + 900).format("HH:mm");
      chooseHour2 = moment.unix(this.state.hour + 1800).format("HH:mm");
    }
    arrChoose.push(chooseHour, chooseHour1, chooseHour2);

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={stylesHome.container}>
        <View
          style={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
        <Text style={{}}>
          &Agrave; partir de quelle heure souhaitez-vous récupérer votre
          commande?{" "}
        </Text>
        <Picker
          selectedValue={this.state.hour}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({
              hour: itemValue
            })
          }
        >
          {pickers}
        </Picker>
        <View style={{}}>
          <TouchableOpacity
            onPress={() =>
              navigate("Restaurants", {
                name: "Restaurant",
                geoloc: this.state.geoloc,
                hour: this.state.hour,
                pick: pickers[0].props.value,
                arrChoose: arrChoose
              })
            }
          >
            <View style={{}}>
              <Text style={{}}>FoodPicking</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
