import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import Items from "./Items";
import axios from "axios";
import AppStyle from "../../AppStyle";

const styles = StyleSheet.create(AppStyle);

export default class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });
  state = {
    cart: 0,
    item: [],
    menu: null,
    onMenu: false,
    menusRestaurant: []
  };

  addItem = item => {
    console.log("qty", item.quantity);
    const newItem = [];
    let found = false;

    for (let i = 0; i < this.state.item.length; i++) {
      newItem.push(this.state.item[i]);
    }

    for (let i = 0; i < newItem.length; i++) {
      //   console.log("item.id", item.id)
      // console.log("newItem[i].id", newItem[i].id)
      if (item.id !== newItem[i].id) {
        found = false;
      } else {
        newItem[i].quantity++;
        found = true;
        break;
      }
    }
    if (found === false) {
      item.quantity = 1;
      newItem.push(item);
    }

    this.setState(
      {
        item: newItem,
        cart: this.state.cart + item.raw_price
      },
      () => {
        console.log("quantity", this.state.item.quantity);
      }
    );
  };
  componentWillMount() {
    console.log("did mount ");
    let link = this.props.navigation.state.params.link;
    let id = this.props.navigation.state.params.id_deliveroo;

    axios
      .get(
        `https://foodpacking-serveur.herokuapp.com/restaurant-menu/?id=${id}&link=${link}`
      )
      .then(response => {
        //menu = response.data;
        this.setState(
          {
            menu: response.data
          },
          () => {
            console.log("Object menu : dans did mount  ", this.state.menu);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _renderItems() {
    console.log("affichage de l id la fonction item : ", this.state.menu.id);

    let menuShow = [];
    // on affiche la suite que si l'id du resto de l'objet correspond à l'id reçu du resto
    // if (
    //   this.state.menu.id ===
    //   Number(this.props.navigation.state.params.id_deliveroo)
    // ) {

    for (let i = 0; i < this.state.menu.menu.categories.length; i++) {
      menuShow.push(
        <View key={i}>
          {/* on récupere le nom de la catégorie et on envoie les infos au composent items */}
          <Text style={styles.titleCategory}>
            {this.state.menu.menu.categories[i].name}
          </Text>
          <View style={styles.blocItem}>
            <Items
              state={this.state.cart}
              addItem={this.addItem}
              idCat={this.state.menu.menu.categories[i]}
              idItem={this.state.menu.menu.items}
            />
          </View>
        </View>
      );
    }

    {
      /* const { navigate } = this.props.navigation; */
    }

    return menuShow;
  }

  _renderMenu() {
    return (
      <ScrollView style={[styles.containerIn, styles.style]}>
        <View style={styles.blocTop}>
          <Image
            style={styles.visuelTop}
            source={{
              uri: this.props.navigation.state.params.picture
            }}
          />
        </View>

        <View style={styles.blocMenuIn}>
          {/* <Text>title: {this.props.navigation.state.params.name}</Text>
      <Text>
        id restaurant: {this.props.navigation.state.params.id_deliveroo}
      </Text>
      <Text>
        lien restaurant: {this.props.navigation.state.params.link}
      </Text> */}
          <View>
            {/* <Text>
          {this.state.menu ? (this.state.menu.infos.menu.menu_tags[0].name ) : null}
          //this.state.menu.infos.menu.menu_tags[1].name 
        </Text> */}
            <Text>
              <Text style={styles.strong}>
                {this.props.navigation.state.params.percent}%
              </Text>{" "}
              {this.props.navigation.state.params.rank} avis
            </Text>
          </View>
          {/* <Text style={[styles.text, styles.description]}>
        {this.state.menu.id ===
        Number(this.props.navigation.state.params.id_deliveroo)
          ? this.state.menu.description
          : null}
      </Text> */}
          <View>{this._renderItems()}</View>

          <View>{menuShow}</View>
          <View>
            <Button
              title="Valider la commande"
              onPress={() =>
                navigate("Cart", {
                  name: "Cart",
                  cart: this.state.cart
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    console.log("render menu ....");

    return this.state.menu ? this._renderMenu() : null;
  }
}
