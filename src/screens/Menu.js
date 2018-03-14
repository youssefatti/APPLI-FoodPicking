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
    items: [],
    menu: null,
    onMenu: false,
    menusRestaurant: []
  };

  componentWillMount() {
    // console.log("did mount ");
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
            // console.log("Object menu : dans did mount  ", this.state.menu);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  addItem = item => {
    const newItem = [];
    let found = false;
    const index = -1;

    for (let i = 0; i < this.state.items.length; i++) {
      newItem.push(this.state.items[i]);
    }

    for (let i = 0; i < newItem.length; i++) {
      //   console.log("item.id", item.id)
      // console.log("newItem[i].id", newItem[i].id)
      if (item.id !== newItem[i].id) {
        found = false;
      } else {
        // console.log("else", newItem[i].quantity);
        found = true;
      }
    }

    if (found === false) {
      item.quantity = 1;
      newItem.push(item);
    } else {
      item.quantity++;
    }
    this.setState(
      {
        items: newItem,
        cart: this.state.cart + item.raw_price
      },
      () => {
        // console.log("item", this.state.items);
        // console.log("longueur de state item : ", this.state.items.length);
        // console.log("longeur de new item : ", newItem.length);
      }
    );
  };
  removeItem = item => {
    const removeItem = [...this.state.items];
    let index = null;

    for (let i = 0; i < removeItem.length; i++) {
      if (item.id === removeItem[i].id) {
        removeItem[i].quantity = removeItem[i].quantity - 1;
        index = i;
      }
      if (index !== null && removeItem[i].quantity < 1) {
        removeItem.splice(index, 1);
      }
      console.log("removeitem", removeItem);
    }
    this.setState(
      {
        items: removeItem,
        cart: this.state.cart - item.raw_price
      },
      () => {
        console.log("item", this.state.items);
        // console.log("longueur de state item : ", this.state.items.length);
        // console.log("longeur de new item : ", newItem.length);
      }
    );
  };
  componentWillMount() {
    console.log("params", this.props.navigation);
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
    let menuShow = [];

    // console.log("affichage de l id la fonction item : ", this.state.menu.id);

    // on affiche la suite que si l'id du resto de l'objet correspond à l'id reçu du resto
    // if (
    //   this.state.menu.id ===
    //   Number(this.props.navigation.state.params.id_deliveroo)
    // ) {
    for (let i = 0; i < this.state.menu.menu.categories.length; i++) {
      menuShow.push(
        <View key={this.state.menu.menu.categories[i].id}>
          {/* on récupere le nom de la catégorie et on envoie les infos au composent items */}
          <Text style={styles.titleCategory}>
            {this.state.menu.menu.categories[i].name}
          </Text>
          <View style={styles.blocItem}>
            <Items
              state={this.state.cart}
              addItem={this.addItem}
              items={this.state.items}
              idCat={this.state.menu.menu.categories[i]}
              idItem={this.state.menu.menu.items}
            />
          </View>
        </View>
      );
    }
    // }
    console.log("itemmmmm", this.state.menu);
    return menuShow;
  }

  _renderMenu() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[styles.containerIn, styles.style]}>
        <View>
          <View>
            <Text>total : {this.state.cart} €</Text>
          </View>
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
              <View
                style={{
                  backgroundColor: "#FBB252",
                  position: "absolute",
                  zIndex: 1,
                  width: 80,
                  height: 50,
                  borderRadius: 10,
                  paddingRight: 5,
                  paddingLeft: 5,
                  paddingTop: 5,
                  paddingBottom: 5,
                  right: 0,
                  top: -70
                }}
              >
                <Text style={styles.strong}>
                  {this.props.navigation.state.params.percent}%
                </Text>

                <Text>{this.props.navigation.state.params.rank} avis</Text>
              </View>
            </View>
            <Text style={[styles.text, styles.description]}>
              {this.state.menu.infos.description}
            </Text>
            <View>{this._renderItems()}</View>
            <View>
              <Button
                title="Valider la commande"
                onPress={() =>
                  navigate("Cart", {
                    name: "Cart",
                    cart: this.state.cart,
                    items: this.state.items,
                    addItem: this.addItem,
                    removeItem: this.removeItem
                  })
                }
              />
            </View>
          </View>
        </View>
        }
      </ScrollView>
    );
  }

  render() {
    console.log("render dans menu");
    // console.log("state menu", this.state.menu);

    return this.state.menu ? this._renderMenu() : null;
  }
}
