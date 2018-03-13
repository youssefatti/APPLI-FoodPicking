import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppStyle from "../../AppStyle";
const styles = StyleSheet.create(AppStyle);

export default class Cart extends React.Component {
  render() {
    console.log(this.props.navigation.state.params.cart);
    return (
      <View
        style={{
          width: 300,
          marginBottom: 10
        }}
      >
        <Text style={styles.strong}>
          total = {this.props.navigation.state.params.cart} €
        </Text>
      </View>
    );
  }
}
