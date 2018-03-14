import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList
} from "react-native";
import AppStyle from "../../AppStyle";
const styles = StyleSheet.create(AppStyle);

export default class Items extends React.Component {
  _renderItemsMenus = () => {
    let arrItems = [];
    // on boucle sur le tableau items
    for (let i = 0; i < this.props.idItem.length; i++) {
      arrItems.push(
        <View key={i} style={styles.blocItem}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.props.addItem(this.props.idItem[i])}
          >
            {this.props.idItem[i].image ? (
              <Image
                style={styles.picRestaurant}
                source={{
                  uri: `https:${this.props.idItem[i].image}`
                }}
              />
            ) : null}
            <View style={styles.textItem}>
              <Text style={styles.strong}>{this.props.idItem[i].name}</Text>
              {this.props.idItem[i].description ? (
                <Text>{this.props.idItem[i].description}</Text>
              ) : null}
              <Text style={[styles.strong, styles.text]}>
                {this.props.idItem[i].price}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    // this.setState(
    //   {
    //     itemsMenus: arrItems
    //   },
    //   () => {
    //     console.log("affichage du itemsMenus : ", this.state.itemsMenus);
    //   }
    // );
    // console.log("cart dans item ", this.props.state);
    return (
      <View>
        <Text>{arrItems}</Text>
      </View>
    );
  };

  render() {
    console.log("render de items ");

    return this._renderItemsMenus();
  }
}
