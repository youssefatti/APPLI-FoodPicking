import React from "react";
import {
  Button,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  View,
  StatusBar
} from "react-native";

import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

import { StyleRestaurant } from "./StyleRestaurant";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const resto = {};

export default class Restaurants extends React.PureComponent {
  // static navigationOptions = ({ navigation }) => ({
  //   title: navigation.state.params.name
  // });

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "white",
      borderBottomWidth: 0
    },
    headerTintColor: "#7FC149",
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

  ShowHideActivityIndicator = () => {
    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
    }
  };

  priceRank = i => {
    const priceRanking = [];
    for (
      let j = 0;
      j < this.state.restaurants[i].attributes.price_category;
      j++
    ) {
      priceRanking.push(
        <Text
          style={{
            color: "#7FC149",
            fontFamily: "Lato-Bold",
            lineHeight: 20
          }}
        >
          {this.state.restaurants[i].attributes.price_category_symbol}
        </Text>
      );
    }
    return priceRanking;
  };

  componentDidMount() {
    console.log("Did mount restaurants Page ");

    let hour = this.props.navigation.state.params.hour;
    let geohash = this.props.navigation.state.params.geoloc;

    // console.log("hour dans resto : ", hour);
    //console.log("geohash dans resto ", geohash);

    axios
      .get(
        hour === null || hour === this.props.navigation.state.params.pick
          ? `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=${geohash}`
          : `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?delivery_time=${hour}&geohash=${geohash}`
      )
      .then(response => {
        console.log("response seule : ", response);
        //console.log("reponse dans la liste des resto : ", response.data.data);
        // console.log(
        //   "reponse dans la liste pour type : ",
        //   response.data.included
        // );
        this.props.navigation.setParams({
          title: response.data.meta.neighborhood_name
        });
        let element = [];
        const time1 = [];
        const time2 = [];

        response.data.data.map((item, index) => {
          if (
            hour === null ||
            hour === this.props.navigation.state.params.pick
          ) {
            if (item.attributes.delivery_time === "15 - 25") {
              item.relationships.menu_tags.data = item.relationships.menu_tags.data.map(
                obj => response.data.included.find(o => o.id === obj.id) || obj
              );
              time1.push(item);
            }
            if (item.attributes.delivery_time === "30 - 40") {
              item.relationships.menu_tags.data = item.relationships.menu_tags.data.map(
                obj => response.data.included.find(o => o.id === obj.id) || obj
              );
              time2.push(item);
            }
          } else {
            if (
              item.attributes.rating_percentage > 90 &&
              item.attributes.rating_percentage !== null
            ) {
              item.relationships.menu_tags.data = item.relationships.menu_tags.data.map(
                obj => response.data.included.find(o => o.id === obj.id) || obj
              );
              time1.push(item);
            }
            if (
              item.attributes.rating_percentage > 85 &&
              item.attributes.rating_percentage < 90 &&
              item.attributes.rating_percentage !== null
            ) {
              item.relationships.menu_tags.data = item.relationships.menu_tags.data.map(
                obj => response.data.included.find(o => o.id === obj.id) || obj
              );
              time2.push(item);
            }
          }
          if (time1.length > 3) {
            return (element = time1);
          } else {
            return (element = time2);
          }
        });

        console.log("restaurantTypeId  : ", element);
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
    console.log("resto", this.state.restaurants);
    const { navigate } = this.props.navigation;
    const arrResto = [];
    for (let i = 0; i < this.state.restaurants.length; i++) {
      arrResto.push(
        <View key={i} style={StyleRestaurant.container}>
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
              style={{ width: "100%", height: height / 5 }}
              source={{
                uri: this.state.restaurants[i].attributes.image_url
              }}
            />
          </TouchableOpacity>
          <View style={StyleRestaurant.restaurantNameView}>
            <View style={StyleRestaurant.flex}>
              <Text style={StyleRestaurant.restaurantName}>
                {this.state.restaurants[i].attributes.name}
              </Text>
              <View style={StyleRestaurant.menuTag}>
                {this.state.restaurants[i].relationships.menu_tags.data.map(
                  (item1, index1) => {
                    if (item1.attributes.tag_type !== "Collection") {
                      return [
                        <Text
                          key={index1}
                          style={{
                            color: "#4A4A4A",
                            lineHeight: 20
                          }}
                        >
                          {item1.attributes.name}
                        </Text>,
                        <Text
                          key={index1 + "tag"}
                          style={{
                            color: "#4A4A4A",
                            lineHeight: 20
                          }}
                        >
                          {" "}
                          &middot;{" "}
                        </Text>
                      ];
                    }
                  }
                )}
                {this.priceRank(i)}
              </View>
            </View>

            <View style={StyleRestaurant.rankView}>
              <Text style={StyleRestaurant.textAvis}>
                {this.state.restaurants[i].attributes.rating_percentage}%
              </Text>
              <Text style={StyleRestaurant.textAvis}>
                {this.state.restaurants[i].attributes.rating_formatted_count}{" "}
                Avis
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return [
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar barStyle="dark-content" />
        <View>
          {this.state.length === this.state.restaurants.length ? (
            this.state.length === 0 && this.state.restaurants.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="ios-alert" size={100} color="#7FC149" />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Lato-Regular",
                    color: "#4A4A4A",
                    textAlign: "center"
                  }}
                >
                  Nous sommes désolés ! Aucun restaurant ne peut livrer à{" "}
                  {this.props.navigation.state.params.title} à l'heure
                  sélectionnée
                </Text>
              </View>
            ) : (
              <View>{arrResto}</View>
            )
          ) : (
            <ActivityIndicator
              size="large"
              color="#7FC149"
              style={{ alignSelf: "center", flex: 1 }}
            />
          )}
        </View>
      </ScrollView>,
      <View style={StyleRestaurant.UserNav}>
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
