import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Items from "./Items";
import axios from "axios";
import AppStyle from "../../AppStyle";

const styles = StyleSheet.create(AppStyle);

export default class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  state = {
    menu: null,
    onMenu: false,
    menusRestaurant: []
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
              idCat={this.state.menu.menu.categories[i]}
              idItem={this.state.menu.menu.items}
            />
          </View>
        </View>
      );
    }

    //}
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
        </View>
      </ScrollView>
    );
  }

  render() {
    console.log("render menu ....");

    return this.state.menu ? this._renderMenu() : null;
  }
}
