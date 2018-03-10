import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Items from "./Items";

export default class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });
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
