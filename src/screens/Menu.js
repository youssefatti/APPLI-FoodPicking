import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Items from "./Items";
import axios from "axios";

export default class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  componentDidMount() {
    console.log("did mount ");
    let link = this.props.navigation.state.params.link;
    let id = this.props.navigation.state.params.id_deliveroo;

    axios
      .get(
        `https://foodpacking-serveur.herokuapp.com/restaurant-menu/?id=${id}&link=${link}`

        // {
        //   query: { id, link }
        // }
      )
      .then(response => {
        console.log("response", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={[styles.container, styles.style]}>
        <View>
          <Text>title: {this.props.navigation.state.params.name}</Text>
          <Text>
            id restaurant: {this.props.navigation.state.params.id_deliveroo}
          </Text>
          <Text>
            lien restaurant: {this.props.navigation.state.params.link}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  },
  style: {
    flex: 1
  }
});
