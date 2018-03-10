import React from "react";
import axios from "axios";
import {
  Button,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";

export default class Restaurants extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  render() {
    let resto = {
      data: [
        {
          id: "47900",
          type: "restaurant",
          attributes: {
            name: "Pierre Sang - Express",
            delivery_time: "10 - 20",
            delivery_time_units: "minutes",
            delivery_time_ranking: 15,
            image_url:
              "https://f.roocdn.com/images/menus/36493/header-image.jpg?width={w}&height={h}&auto=webp&format=jpg&fit=crop&v=1492616804{&quality}",
            price_category: 2,
            price_category_symbol: "€",
            newly_added: false,
            rating_percentage: 90,
            rating_formatted_count: "50+",
            delivery_status: "available"
          },
          relationships: {
            menu_tags: {
              data: [
                {
                  id: "7",
                  type: "menu_tag"
                },
                {
                  id: "147",
                  type: "menu_tag"
                },
                {
                  id: "10",
                  type: "menu_tag"
                },
                {
                  id: "110",
                  type: "menu_tag"
                },
                {
                  id: "359",
                  type: "menu_tag"
                }
              ]
            }
          },
          links: {
            web:
              "https://deliveroo.fr/menu/paris/11eme-republique/pierre-sang?day=today&time=ASAP"
          }
        },
        {
          id: "25541",
          type: "restaurant",
          attributes: {
            name: "Little Apple",
            delivery_time: "15 - 25",
            delivery_time_units: "minutes",
            delivery_time_ranking: 20,
            image_url:
              "https://f.roocdn.com/images/menus/21320/header-image.jpg?width={w}&height={h}&auto=webp&format=jpg&fit=crop&v=1473408519{&quality}",
            price_category: 2,
            price_category_symbol: "€",
            newly_added: false,
            rating_percentage: 91,
            rating_formatted_count: "50+",
            delivery_status: "available"
          },
          relationships: {
            menu_tags: {
              data: [
                {
                  id: "6",
                  type: "menu_tag"
                },
                {
                  id: "35",
                  type: "menu_tag"
                },
                {
                  id: "293",
                  type: "menu_tag"
                },
                {
                  id: "289",
                  type: "menu_tag"
                }
              ]
            }
          },
          links: {
            web:
              "https://deliveroo.fr/menu/paris/3eme-temple/little-apple?day=today&time=ASAP"
          }
        },
        {
          id: "65303",
          type: "restaurant",
          attributes: {
            name: "Nabab Kebab",
            delivery_time: "15 - 25",
            delivery_time_units: "minutes",
            delivery_time_ranking: 20,
            image_url:
              "https://f.roocdn.com/images/menus/52200/header-image.jpg?width={w}&height={h}&auto=webp&format=jpg&fit=crop&v=1514989940{&quality}",
            price_category: 1,
            price_category_symbol: "€",
            newly_added: false,
            rating_percentage: 84,
            rating_formatted_count: "50+",
            delivery_status: "available"
          },
          relationships: {
            menu_tags: {
              data: [
                {
                  id: "286",
                  type: "menu_tag"
                }
              ]
            }
          },
          links: {
            web:
              "https://deliveroo.fr/menu/paris/1er-louvre/nabab-rambuteau?day=today&time=ASAP"
          }
        },
        {
          id: "31219",
          type: "restaurant",
          attributes: {
            name: "Burger and Fries",
            delivery_time: "15 - 25",
            delivery_time_units: "minutes",
            delivery_time_ranking: 20,
            image_url:
              "https://f.roocdn.com/images/menus/24827/header-image.jpg?width={w}&height={h}&auto=webp&format=jpg&fit=crop&v=1480586675{&quality}",
            price_category: 1,
            price_category_symbol: "€",
            newly_added: false,
            rating_percentage: 90,
            rating_formatted_count: "50+",
            delivery_status: "available"
          },
          relationships: {
            menu_tags: {
              data: [
                {
                  id: "6",
                  type: "menu_tag"
                },
                {
                  id: "35",
                  type: "menu_tag"
                },
                {
                  id: "288",
                  type: "menu_tag"
                }
              ]
            }
          },
          links: {
            web:
              "https://deliveroo.fr/menu/paris/2eme-bourse/bb?day=today&time=ASAP"
          }
        }
      ]
    };

    const { navigate } = this.props.navigation;
    // récupération du nom et de la photo
    const arrResto = [];
    for (let i = 0; i < resto.data.length; i++) {
      arrResto.push(
        <View style={styles.bloc}>
          <TouchableOpacity
            onPress={() =>
              // passage du nom, id et lien à la page Menu
              navigate("Menu", {
                name: resto.data[i].attributes.name,
                id_deliveroo: resto.data[i].id,
                link: resto.data[i].links.web
              })
            }
          >
            <Image
              style={styles.picRestaurant}
              source={{ uri: resto.data[i].attributes.image_url }}
            />
          </TouchableOpacity>
          <View style={styles.blocIn}>
            <Text>{resto.data[i].attributes.name}</Text>
          </View>
        </View>
      );
    }
    return (
      <ScrollView style={[styles.container, styles.style]}>
        <Image
          style={styles.visuelTop}
          source={{
            uri: "https://f.roocdn.com/images/menu_items/1772997/item-image.jpg"
          }}
        />
        <View style={styles.bloc}>
          // affichage des éléments
          <View>{arrResto}</View>
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
  },
  bloc: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10
  },
  blocIn: {
    width: 220,
    paddingLeft: 10
  },
  justifyText: {
    textAlign: "justify"
  },
  picRestaurant: {
    width: 120,
    height: 120,
    borderRadius: 10
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  visuelTop: {
    width: 480,
    height: 100
  }
});
