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
    error: null,
    geoloc: null,
    hour: null
  };

  // Optimizing the rendering page, if the geoloc state not changing then we don't rendering

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.geoloc === nextProps.geoloc) {
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
        //console.log("geo hash in home page  : ", geohash);
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
    console.log("Will mount home page");
    this.getGeoLoc();
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
    console.log("picker", pickers[0].props.value);

    console.log("rendering home page");
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[styles.container, styles.style, styles.bgColorHome]}>
        <View style={styles.blocLogo}>
          <TouchableOpacity
            onPress={() =>
              navigate("Restaurants", {
                name: "Restaurant",
                geoloc: this.state.geoloc,
                hour: this.state.hour,
                pick: pickers[0].props.value
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
          {/* <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text> */}
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
