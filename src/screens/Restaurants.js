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
  static navigationOptions = {
    header: null
  };

  render() {
    let resto = {
      basket: {
        restaurant: {
          id: 32377,
          name: "Mamma Roma",
          name_with_branch: "Mamma Roma",
          description:
            "Goûtez plusieurs variétés de pizza à la fois en choisissant parmi les recettes originales et modernes de Mamma Roma, à base de produits italiens authentiques.",
          newly_added: false,
          uname: "mamma-roma-oberkampf",
          price_category: 2,
          currency_symbol: "€",
          menu: {
            menu_tags: [
              { type: "Locale", name: "Italien" },
              { type: "Food", name: "Pizza" },
              { type: "Collection", name: "Exclusivement Sur Deliveroo" }
            ]
          },
          opens_at: "12:00",
          closes_at: "23:30",
          street_address: "90 rue Oberkampf",
          post_code: "75011",
          neighborhood: "Paris 11ème - Belleville",
          phone_numbers: { primary: "+33147003790", secondary: "+33680968236" },
          accepts_allergy_notes: true,
          city: "Paris",
          open: true,
          image:
            "https://f.roocdn.com/images/menus/25609/header-image.jpg?width=320\u0026height=180\u0026auto=webp\u0026format=jpg\u0026fit=crop\u0026v=1504541910",
          countrywide_allergy_warnings:
            "Tous les plats peuvent contenir un ou plusieurs des allergènes suivants: Blé; Gluten; Cacahuètes; noisettes; Graines de sésame; Céleri, soja; Lait; œufs; Moutarde; Lupin; Mollusque; Crustacés; Poisson; Dioxyde de soufre.\n\nLes plats peuvent également contenir des additifs alimentaires tels que du porc, de l'alcool et/ou d'autres substances qui peuvent ne pas convenir pour des femmes enceintes ou des personnes ayant des besoins diététiques spécifiques.\n\nPour toute question concernant les allergènes ou d’autres contenus de plats spécifiques, veuillez contacter directement le restaurant."
        },
        menu: {
          id: 25609,
          categories: [
            {
              id: 289671,
              description: null,
              name: "Antipasti",
              sort_order: 1,
              top_level: true,
              unique_id: 289843,
              items: [
                {
                  id: 2204776,
                  uid: 2204796,
                  name: "Grande assiette d'antipasti",
                  description:
                    "Antipasti frais et variés, salades mixtes, selon les saisons et les envies du chef",
                  price: "10,80 €",
                  raw_price: 10.8,
                  price_unit: "€",
                  alt_mod_price: null,
                  sort_order: 21,
                  popular: false,
                  alcohol: false,
                  category_id: 289671,
                  image: null,
                  modifier_groups: []
                },
                {
                  id: 3072520,
                  uid: 3072551,
                  name: "Petite assiette d'antipasti",
                  description:
                    "Antipasti frais et variés, salades mixtes, selon les saisons et les envies du chef",
                  price: "6,50 €",
                  raw_price: 6.5,
                  price_unit: "€",
                  alt_mod_price: null,
                  sort_order: 22,
                  popular: false,
                  alcohol: false,
                  category_id: 289671,
                  image: null,
                  modifier_groups: []
                }
              ]
            },
            {
              id: 289668,
              description: "1 part de pizza 10x20 cm ",
              name: "Pizza à la découpe ",
              sort_order: 2,
              top_level: true,
              unique_id: 289840,
              items: [
                {
                  id: 2204764,
                  uid: 2204784,
                  name: "Patate al tartuffo",
                  description:
                    "Mozzarella di Bufala AOC, pommes de terre, sauce truffe",
                  price: "6,90 €",
                  raw_price: 6.9,
                  price_unit: "€",
                  alt_mod_price: null,
                  sort_order: 1,
                  popular: true,
                  alcohol: false,
                  category_id: 289668,
                  image: null,
                  modifier_groups: []
                },
                {
                  id: 2204765,
                  uid: 2204785,
                  name: "Diavola",
                  description:
                    "Tomates, formage stracchino, ventricina (salaison italienne)",
                  price: "6,90 €",
                  raw_price: 6.9,
                  price_unit: "€",
                  alt_mod_price: null,
                  sort_order: 2,
                  popular: false,
                  alcohol: false,
                  category_id: 289668,
                  image: null,
                  modifier_groups: []
                },
                {
                  id: 2204767,
                  uid: 2204787,
                  name: "Fredda Parma",
                  description:
                    "Artichauts, jambon de Parme, olives, fromage Grana Padano",
                  price: "5,90 €",
                  raw_price: 5.9,
                  price_unit: "€",
                  alt_mod_price: null,
                  sort_order: 5,
                  popular: false,
                  alcohol: false,
                  category_id: 289668,
                  image: null,
                  modifier_groups: []
                }
              ]
            }
          ]
        }
      }
    };

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[styles.container, styles.style]}>
        <Text>Logo FoodPicking</Text>
        <Image
          style={styles.visuelTop}
          source={{
            uri: "https://f.roocdn.com/images/menu_items/1772997/item-image.jpg"
          }}
        />
        <View style={styles.bloc}>
          <View>
            <TouchableOpacity
              title={`Go to ${resto.basket.restaurant.name} menu`}
              onPress={() =>
                navigate("Menu", {
                  name: resto.basket.restaurant.name,
                  data: resto.basket
                })
              }
            >
              <Image
                style={styles.picRestaurant}
                source={{ uri: resto.basket.restaurant.image }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.blocIn}>
            <Text style={styles.title}>{resto.basket.restaurant.name}</Text>
            <Text>{resto.basket.restaurant.street_address}</Text>
            <Text>
              {resto.basket.restaurant.post_code} {resto.basket.restaurant.city}
            </Text>
            <Text style={styles.justifyText}>
              {resto.basket.restaurant.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 30
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
    width: 220
  },
  justifyText: {
    textAlign: "justify"
  },
  picRestaurant: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  visuelTop: {
    width: "100%",
    height: "100%"
  }
});
