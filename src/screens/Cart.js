import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import AppStyle from "../../AppStyle";
const styles = StyleSheet.create(AppStyle);

export default class Cart extends React.Component {
  state = {
    cart: this.props.navigation.state.params.cart
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("a", this.props.navigation.state.params.cart, nextProps);
  //   console.log("b", this.props.navigation.state.params.items, nextProps);
  // }
  //   const differentTitle =
  //     this.props.navigation.state.params.car !== nextProps.cart;
  //   const differentDone =
  //     this.props.navigation.state.params.items !== nextProps.items;
  //   return differentTitle || differentDone;
  // }
  // if (this.props.color !== nextProps.color) {
  //   return true;
  // }
  // if (this.state.count !== nextState.count) {
  //   return true;
  // }
  //   return false;
  // }

  render() {
    console.log("render dans Cart");
    console.log("cart", this.props.navigation.state.params);
    return [
      <View
        style={{
          width: 300,
          marginBottom: 10
        }}
      >
        <Text style={styles.strong}>
          total = {this.props.navigation.state.params.cart} €
        </Text>
        <Text>
          {this.props.navigation.state.params.items.map((item, index) => {
            return item.quantity < 1 ? null : (
              <View key={index}>
                <Button
                  title="-"
                  onPress={() => {
                    this.props.navigation.state.params.removeItem(item);
                    this.setState({
                      cart: this.props.navigation.state.params.cart
                    });
                    this.forceUpdateHandler;
                  }}
                />
                <Text>
                  {" "}
                  {item.name} {item.quantity}{" "}
                </Text>
                <Button
                  title="+"
                  onPress={() =>
                    this.props.navigation.state.params.addItem(item)
                  }
                />
              </View>
            );
          })}
        </Text>
      </View>
    ];
  }
}
