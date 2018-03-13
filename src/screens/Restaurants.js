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
import AppStyle from "../../AppStyle";
const styles = StyleSheet.create(AppStyle);
import Icon from "react-native-vector-icons/Ionicons";

const resto = {};

export default class Restaurants extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  state = {
    restaurants: [],
    restaurantsAll: [],
    isLoading: true,
    length: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.restaurants !== this.state.restaurants) {
      //console.log("is changing");
      return true;
    }
    // console.log("appel a show hide");
    // ShowHideActivityIndicator();
    return false;

    //console.log("is changing or du if : ");
  }

  ShowHideActivityIndicator = () => {
    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
    }
  };

  componentDidMount() {
    console.log("did mount ");
    console.log("hour", this.props.navigation.state.params.hour);
    let hour = this.props.navigation.state.params.hour;
    let geohash = this.props.navigation.state.params.geoloc;

    axios
      .get(
        hour === "now"
          ? `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=${geohash}`
          : `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?delivery_time=${hour}&geohash=${geohash}`
      )
      .then(response => {
        const element = [];
        const elementAll = [];
        this.setState({
          length: response.data.data.length
        });
        for (let i = 0; i < response.data.data.length; i++) {
          if (i < 20) {
            element.push(response.data.data[i]);
          }
          elementAll.push(response.data.data[i]);
          //console.log("tableau : ", i + " et " + response.data.data[i]);
          // },
          // () => {
          //   //console.log("liste des resto : ", this.state.restaurants.length);
          // }
          this.setState({
            restaurants: element,
            restaurantsAll: elementAll
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log("rendering");
    console.log("data", this.state.length);
    console.log("arr", this.state.restaurants.length);
    //console.log("is loading ", this.state.isLoading);
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
                percent: this.state.restaurants[i].attributes.rating_percentage
              })
            }
          >
            <Image
              style={styles.picRestaurant}
              source={{
                uri: `${
                  this.state.restaurants[i].attributes.image_url
                }?width=50&height=50&auto=webp&format=jpg&fit=crop`
              }}
            />
          </TouchableOpacity>
          <View style={styles.blocIn}>
            <Text>{this.state.restaurants[i].attributes.name}</Text>
          </View>
        </View>
      );
    }
    console.log("taille", arrResto.length);
    return (
      <ScrollView style={[styles.containerIn, styles.style]}>
        <Image
          style={styles.visuelTop}
          source={{
            uri: "https://f.roocdn.com/images/menu_items/1772997/item-image.jpg"
          }}
        />

        <View style={styles.bloc}>
          // affichage des éléments
          {this.state.length === this.state.restaurantsAll.length ? (
            <View>{arrResto}</View>
          ) : (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ alignSelf: "center", flex: 1 }}
            />
          )}
          {/*  */}
        </View>
      </ScrollView>
    );
  }
}
