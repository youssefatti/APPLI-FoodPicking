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
import AppStyle from "../../AppStyle";
const styles = StyleSheet.create(AppStyle);

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    latitude: null,
    longitude: null,
    error: null,
    geoloc: null,
    hour: "now"
  };
  componentDidMount() {
    console.log("did mount ");
    const lat = 48.85674155317247;
    const lon = 2.3544311709702015;

    let geohash = geo.encode(lat, lon); //"u09tvw47nhxp";
    this.setState({
      geoloc: geohash
    });
    console.log("geo hash : ", geohash);

    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
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

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
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
      pickers.push(
        <Picker.Item
          key={i}
          label={moment((timestamp + i * 900) * 1000).format("HH:mm")}
          value={moment((timestamp + i * 900) * 1000).unix()}
        />
      );
    }
    //navigator.geolocation.requestAuthorization();
    // var options = {
    //   enableHighAccuracy: false,
    //   timeout: 10000,
    //   maximumAge: 0
    // };

    // function success(pos) {
    //   console.log("pos : ", pos);
    //   var crd = pos.coords;

    //   console.log("Your current position is:");
    //   console.log(`Latitude : ${crd.latitude}`);
    //   console.log(`Longitude: ${crd.longitude}`);
    //   console.log(`More or less ${crd.accuracy} meters.`);
    //   console.log("watchID : ", watchID);
    // }

    // function error(err) {
    //   console.warn(`ERROR(${err.code}): ${err.message}`);
    // }

    // let watchID = navigator.geolocation.watchPosition(success, error, options);
    // navigator.geolocation.clearWatch(watchID);

    // navigator.geolocation.getCurrentPosition(success, error, options);

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[styles.container, styles.style, styles.bgColorHome]}>
        <View style={styles.blocLogo}>
          <TouchableOpacity
            onPress={() =>
              navigate("Restaurants", {
                name: "Restaurant",
                geoloc: this.state.geoloc,
                hour: this.state.hour
              })
            }
          >
            <View style={styles.picHome}>
              <Text style={styles.logoText}>FoodPicking</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
        <Text>Quand récuperer ma commande : </Text>
        <Picker
          selectedValue={this.state.hour}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ hour: itemValue })
          }
        >
          {pickers}
        </Picker>
      </ScrollView>
    );
  }
}
