import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import Items from "./Items";
import _ from "lodash";

export default class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });
  render() {
    // const { goBack } = this.props.navigation;

    const idList = [];
    for (
      let i = 0;
      i < this.props.navigation.state.params.data.menu.categories.length;
      i++
    ) {
      let array = idList.push(
        <View style={styles.blocItemIn}>
          <Text style={styles.titleCategory}>
            {this.props.navigation.state.params.data.menu.categories[i].name}
          </Text>
          <Text style={styles.italicText}>
            {
              this.props.navigation.state.params.data.menu.categories[i]
                .items[0].name
            }
          </Text>
          <Text style={styles.justifyText}>
            {
              this.props.navigation.state.params.data.menu.categories[i]
                .items[0].description
            }
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={[styles.container, styles.style]}>
        <View>
          <Image
            style={styles.picRestaurantTop}
            source={{
              uri: this.props.navigation.state.params.data.restaurant.image
            }}
          />
          <View style={styles.blocItem}>{idList}</View>
          <Text />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  style: {
    flex: 1
  },
  blocItem: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10
  },
  blocItemIn: {
    width: 170
  },
  justifyText: {
    textAlign: "justify"
  },
  italicText: {
    fontStyle: "italic"
  },
  picRestaurantTop: {
    width: "100%",
    height: "100%"
  },
  titleCategory: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
