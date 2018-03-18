import React from "react";
import axios from "axios";

import {
  Button,
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
import StyleAccount from "./StyleFavorites";
const styleAccount = StyleSheet.create(StyleAccount);
import Icon from "react-native-vector-icons/Ionicons";

const resto = {};

export default class Favorites extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: navigation.state.params.name
  // });

  static navigationOptions = ({ navigation }) => ({
    title:
      typeof navigation.state.params === "undefined" ||
      typeof navigation.state.params.title === "undefined"
        ? null
        : navigation.state.params.title,
    // remove title on the back button
    headerBackTitle: null
  });
  state = {
    restaurants: [],
    isLoading: true,
    length: null,
    hour: this.props.navigation.state.params.hour
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.restaurants === nextProps.restaurants) {
  //     return false;
  //   }
  //   return true;
  // }

  ShowHideActivityIndicator = () => {
    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
    }
  };

  componentDidMount() {
    console.log("Will mount restaurants Page ");
    let hour = this.props.navigation.state.params.hour;
    let geohash = this.props.navigation.state.params.geoloc;
    axios
      .get(
        hour === null || hour === this.props.navigation.state.params.pick
          ? `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=${geohash}`
          : `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?delivery_time=${hour}&geohash=${geohash}`
      )
      .then(response => {
        this.props.navigation.setParams({
          title: response.data.meta.neighborhood_name
        });
        const element = [];
        response.data.data.map((item, index) => {
          if (
            hour === null ||
            hour === this.props.navigation.state.params.pick
          ) {
            if (item.attributes.delivery_time === "10 - 20") {
              element.push(item);
            }
            if (item.attributes.delivery_time === "15 - 25") {
              element.push(item);
            }
          } else {
            if (item.attributes.rating_percentage > 90) {
              element.push(item);
            }
            if (item.attributes.rating_percentage > 80) {
              element.push(item);
            }
          }
          return element;
        });
        this.setState({
          restaurants: element,
          length: element.length
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    console.log("rendering restaurants Page");
    const { navigate } = this.props.navigation;
    // récupération du nom et de la photo
    const arrResto = [];
    for (let i = 0; i < this.state.restaurants.length; i++) {
      arrResto.push(
        <View key={i} style={styles.bloc}>
          <TouchableOpacity
            onPress={() =>
              // passage du nom, id et lien à la page Menu
              navigate("Menu", {
                name: this.state.restaurants[i].attributes.name,
                id_deliveroo: this.state.restaurants[i].id,
                link: this.state.restaurants[i].links.web,
                picture: this.state.restaurants[i].attributes.image_url,
                rank: this.state.restaurants[i].attributes
                  .rating_formatted_count,
                percent: this.state.restaurants[i].attributes.rating_percentage,
                arrChoose: this.props.navigation.state.params.arrChoose,
                data: this.props.navigation.state.params.data
              })
            }
          >
            <Image
              style={styles.picRestaurant}
              source={{
                uri: this.state.restaurants[i].attributes.image_url
              }}
            />
          </TouchableOpacity>
          <View style={styles.blocIn}>
            <Text>{this.state.restaurants[i].attributes.name}</Text>
          </View>
        </View>
      );
    }
    return [
      <ScrollView style={[styles.containerIn, styles.style, styles.userSpace]}>
        <View style={styles.bloc}>
          // affichage des éléments
          {this.state.length === this.state.restaurants.length ? (
            <View>{arrResto}</View>
          ) : (
            <ActivityIndicator
              size="large"
              color="#FBB252"
              style={{ alignSelf: "center", flex: 1 }}
            />
          )}
        </View>
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
