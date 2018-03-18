import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  Picker
} from "react-native";
import Items from "../Items/Items";
import axios from "axios";
import AppStyle from "../../../AppStyle";
import Icon from "react-native-vector-icons/Ionicons";

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
    menusRestaurant: [],
    popUpDisplay: false,
    cancelCart: false,
    chosenHour: null
  };

  addItem = item => {
    console.log("qty", item.quantity);
    const newItem = [];
    let found = false;

    for (let i = 0; i < this.state.items.length; i++) {
      newItem.push(this.state.items[i]);
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
        items: newItem,
        cart: this.state.cart + item.raw_price
      },
      () => {
        console.log("quantity", this.state.items.quantity);
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
        cart:
          parseFloat(this.state.cart).toFixed(2) -
          parseFloat(item.raw_price).toFixed(2)
      },
      () => {
        console.log("item -", this.state.items);
        // console.log("longueur de state item : ", this.state.items.length);
        // console.log("longeur de new item : ", newItem.length);
      }
    );
  };

  setModalVisible(popUpDisplay) {
    if (this.state.popUpDisplay) {
      this.setState({ popUpDisplay: false });
    } else {
      this.setState({ popUpDisplay: true });
    }
  }

  _keyExtractor = (item, index) => item.id;

  componentDidMount() {
    console.log("params", this.props.navigation);
    console.log("did mount ");
    let link = this.props.navigation.state.params.link;
    let id = this.props.navigation.state.params.id_deliveroo;

    axios
      .get(
        `https://foodpacking-serveur.herokuapp.com/api/restaurant/menu/?id=${id}&link=${link}`
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
    console.log("affichage de l id la fonction item : ", this.state.menu.id);
    for (let i = 0; i < this.state.menu.menu.categories.length; i++) {
      menuShow.push(
        <View key={i}>
          {/* on récupere le nom de la catégorie et on envoie les infos au composent items */}
          <Text style={styles.titleCategory}>
            {this.state.menu.menu.categories[i].name}
          </Text>
          <Items
            state={this.state.cart}
            addItem={this.addItem}
            idCat={this.state.menu.menu.categories[i].id}
            idItem={this.state.menu.menu.items}
            items={this.state.items}
            chooseHour={this.props.navigation.state.params.chooseHour}
          />
        </View>
      );
    }
    // }
    return menuShow;
  }

  _renderMenu() {
    const { navigate } = this.props.navigation;
    return [
      <View style={{ flex: 1 }}>
        <ScrollView style={[styles.containerIn, styles.style]}>
          <View>
            <View style={styles.blocTop}>
              <Image
                style={styles.visuelTop}
                source={{
                  uri: this.props.navigation.state.params.picture
                }}
              />
            </View>
            <View style={styles.blocMenuIn}>
              <View>
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
            </View>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.popUpDisplay}
        >
          <View
          // style={{ marginTop: 22, flex: 1 }}
          >
            <View>
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.header}>Mon Panier</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(this.state.isPopupVisible);
                  }}
                >
                  <Icon
                    style={{ justifyContent: "flex-end" }}
                    name="ios-close-circle-outline"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={this.state.chosenHour}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ chosenHour: itemValue })
                }
              >
                <Picker.Item
                  label={this.props.navigation.state.params.arrChoose[0]}
                  value={this.props.navigation.state.params.arrChoose[0]}
                />

                <Picker.Item
                  label={this.props.navigation.state.params.arrChoose[1]}
                  value={this.props.navigation.state.params.arrChoose[1]}
                />

                <Picker.Item
                  label={this.props.navigation.state.params.arrChoose[2]}
                  value={this.props.navigation.state.params.arrChoose[2]}
                />
              </Picker>
              <Text />
              <FlatList
                keyExtractor={this._keyExtractor}
                data={this.state.items}
                renderItem={({ item }) => (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Button
                        title="-"
                        onPress={() => {
                          this.removeItem(item);
                        }}
                      />
                      <Text>
                        {item.quantity} x {item.name}{" "}
                      </Text>
                      <Button title="+" onPress={() => this.addItem(item)} />
                    </View>
                    <Text>{(item.quantity * item.raw_price).toFixed(2)}</Text>
                  </View>
                )}
              />
              <Text style={styles.strong}>
                total = {parseFloat(this.state.cart).toFixed(2)} €
              </Text>
            </View>
          </View>
          <View>
            <Button
              onPress={() => {
                this.setState({ popUpDisplay: false });
                navigate("Payment", {
                  name: "Paiement",
                  amount: this.state.cart,
                  restaurantName: this.props.navigation.state.params.name,
                  chosenHour:
                    this.state.chosenHour === null
                      ? this.props.navigation.state.params.arrChoose[0]
                      : this.state.chosenHour,
                  arrChoose: this.props.navigation.state.params.arrChoose,
                  items: this.state.items,
                  data: this.props.navigation.state.params.data
                });
              }}
              style={styles.button}
              title="Payer"
            />
          </View>
        </Modal>
      </View>,

      <View>
        <Text>total : {parseFloat(this.state.cart).toFixed(2)} €</Text>
        <Button
          title="Valider la commande"
          onPress={() => this.setModalVisible(this.popUpDisplay)}
        />
      </View>
    ];
  }

  render() {
    // console.log("picker", typeof this.props.navigation.state.params.chooseHour);
    console.log("render menu ....");

    return this.state.menu ? this._renderMenu() : null;
  }
}
