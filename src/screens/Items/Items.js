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
import AppStyle from "../../../AppStyle";
const styles = StyleSheet.create(AppStyle);
import ItemsStyles from "./ItemsStyles";
const itemsStyles = StyleSheet.create(ItemsStyles);

export default class Items extends React.Component {
  state = {
    itemsMenus: null
  };

  _renderItemsMenus() {
    let arrItems = [];
    // on boucle sur le tableau items
    for (let i = 0; i < this.props.idItem.length; i++) {
      arrItems.push(
        <View key={i} style={itemsStyles.blocItem}>
          <TouchableOpacity
            style={itemsStyles.row}
            onPress={() => this.props.addItem(this.props.idItem[i])}
          >
            {this.props.idItem[i].image ? (
              <Image
                style={itemsStyles.picRestaurant}
                source={{
                  uri: `https:${this.props.idItem[i].image}`
                }}
              />
            ) : null}
            <View
              style={[
                itemsStyles.textItem,
                this.props.idItem[i].image ? itemsStyles.spaceText : null
              ]}
            >
              <Text style={styles.strong}>{this.props.idItem[i].name}</Text>
              {this.props.idItem[i].description ? (
                <Text style={itemsStyles.text}>
                  {this.props.idItem[i].description}
                </Text>
              ) : null}
              <Text style={[styles.strong, itemsStyles.green, itemsStyles.end]}>
                {this.props.idItem[i].price}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return <View>{arrItems}</View>;
  }

  render() {
    return this._renderItemsMenus();
  }
}
