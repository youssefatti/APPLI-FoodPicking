import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Items from "./Items";
import axios from "axios";

export default class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  componentDidMount() {
    console.log("did mount ");
    let link = this.props.navigation.state.params.link;
    let id = this.props.navigation.state.params.id_deliveroo;

    axios
      .get(
        `https://foodpacking-serveur.herokuapp.com/restaurant-menu/?id=${id}&link=${link}`

        // {
        //   query: { id, link }
        // }
      )
      .then(response => {
        console.log("response", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let menu = {
      restaurant: {
        id: 31219,
        name: "Burger and Fries",
        name_with_branch: "Burger and Fries",
        description:
          "Chez Burger and Fries tous nos hamburgers sont fraîchement préparés à la commande avec des ingrédients de qualité. ",
        newly_added: false,
        uname: "bb",
        price_category: 1,
        currency_symbol: "€",
        menu: {
          menu_tags: [
            { type: "Locale", name: "Américain" },
            { type: "Food", name: "Burgers" },
            { type: "Collection", name: "Plaisirs Coupables" }
          ]
        },
        opens_at: "11:00",
        closes_at: "23:30",
        street_address: "1 Boulevard de Bonne Nouvelle",
        post_code: "75002",
        neighborhood: "Paris 2ème - Bourse",
        phone_numbers: { primary: "+33142362279", secondary: "+33782983885" },
        accepts_allergy_notes: true,
        city: "Paris",
        open: false,
        image:
          "https://f.roocdn.com/images/menus/24827/header-image.jpg?width=320\u0026height=180\u0026auto=webp\u0026format=jpg\u0026fit=crop\u0026v=1480586675",
        countrywide_allergy_warnings:
          "Tous les plats peuvent contenir un ou plusieurs des allergènes suivants: Blé; Gluten; Cacahuètes; noisettes; Graines de sésame; Céleri, soja; Lait; œufs; Moutarde; Lupin; Mollusque; Crustacés; Poisson; Dioxyde de soufre.\n\nLes plats peuvent également contenir des additifs alimentaires tels que du porc, de l'alcool et/ou d'autres substances qui peuvent ne pas convenir pour des femmes enceintes ou des personnes ayant des besoins diététiques spécifiques.\n\nPour toute question concernant les allergènes ou d’autres contenus de plats spécifiques, veuillez contacter directement le restaurant."
      },
      menu: {
        id: 24827,
        categories: [
          // {
          //   id: 277629,
          //   description: "",
          //   name: "Formules",
          //   sort_order: 2,
          //   top_level: true,
          //   unique_id: 277793
          // },
          {
            id: 277631,
            description: "",
            name: "Burgers",
            sort_order: 3,
            top_level: true,
            unique_id: 277795
          },
          {
            id: 277632,
            description: "",
            name: "Fries",
            sort_order: 4,
            top_level: true,
            unique_id: 277796
          },
          {
            id: 277633,
            description: "",
            name: "Milkshakes",
            sort_order: 5,
            top_level: true,
            unique_id: 277797
          },
          // {
          //   id: 277630,
          //   description: "",
          //   name: "Modifier",
          //   sort_order: 6,
          //   top_level: false,
          //   unique_id: 277794
          // },
          {
            id: 287131,
            description: "",
            name: "Grilled cheese",
            sort_order: 7,
            top_level: true,
            unique_id: 287303
          },
          {
            id: 280872,
            description: "",
            name: "Boissons",
            sort_order: 8,
            top_level: true,
            unique_id: 281036
          }
        ],
        items: [
          {
            id: 2107237,
            uid: 2107249,
            name: "Menu 1",
            description:
              "Double-cheese burger, frites fraiches maison et boissons ",
            price: "9,90 €",
            raw_price: 9.9,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 1,
            popular: false,
            alcohol: false,
            category_id: 277629,
            image: null,
            modifier_groups: [57641, 57643, 57645, 57639]
          },
          {
            id: 2136525,
            uid: 2136537,
            name: "Evian 33 cl",
            description: "",
            price: "2,10 €",
            raw_price: 2.1,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 1,
            popular: false,
            alcohol: false,
            category_id: 280872,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107238,
            uid: 2107250,
            name: "Menu 2",
            description: "Cheeseburger, frites et boisson - option NoGlu",
            price: "8,60 €",
            raw_price: 8.6,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 2,
            popular: false,
            alcohol: false,
            category_id: 277629,
            image: null,
            modifier_groups: [57641, 57643, 57645, 57639]
          },
          {
            id: 2136527,
            uid: 2136539,
            name: "Badoit 33 cl",
            description: "33 cl",
            price: "2,10 €",
            raw_price: 2.1,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 2,
            popular: false,
            alcohol: false,
            category_id: 280872,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107239,
            uid: 2107251,
            name: "Menu 3",
            description:
              "Veggie ou hamburger, frites fraiches maison et boissons - option NoGlu",
            price: "6,95 €",
            raw_price: 6.95,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 3,
            popular: false,
            alcohol: false,
            category_id: 277629,
            image: null,
            modifier_groups: [57641, 57645, 57639, 113370, 236721]
          },
          {
            id: 2107240,
            uid: 2107252,
            name: "Oignons frais",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 4,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107241,
            uid: 2107253,
            name: "Oignons grillés",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 5,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2136530,
            uid: 2136542,
            name: "Tropicana orange 25 cl",
            description: "",
            price: "2,85 €",
            raw_price: 2.85,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 5,
            popular: false,
            alcohol: false,
            category_id: 280872,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107242,
            uid: 2107254,
            name: "Sans oignons",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 6,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2136531,
            uid: 2136543,
            name: "Tropicana multifruit 25 cl",
            description: "",
            price: "2,85 €",
            raw_price: 2.85,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 6,
            popular: false,
            alcohol: false,
            category_id: 280872,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107243,
            uid: 2107255,
            name: "Bacon",
            description: null,
            price: "1,00 €",
            raw_price: 1.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 7,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107244,
            uid: 2107256,
            name: "Jalapenos",
            description: null,
            price: "0,75 €",
            raw_price: 0.75,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 8,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107245,
            uid: 2107257,
            name: "Pickles",
            description: null,
            price: "0,50 €",
            raw_price: 0.5,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 9,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107246,
            uid: 2107258,
            name: "Extra cheddar",
            description: "",
            price: "0,65 €",
            raw_price: 0.65,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 10,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107247,
            uid: 2107259,
            name: "Double-cheeseburger",
            description:
              "Potato bun boulanger, sauce burger maison, tomate, laitue, 2 steaks hachés 100% bœuf de race et 2 tranches de vrai cheddar",
            price: "6,90 €",
            raw_price: 6.9,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 11,
            popular: false,
            alcohol: false,
            category_id: 277631,
            image: null,
            modifier_groups: [57641, 57643, 57645]
          },
          {
            id: 2107248,
            uid: 2107260,
            name: "Cheeseburger",
            description:
              "Potato bun boulanger, sauce burger maison, tomate, laitue, 1 steak haché 100% bœuf de race et 1 tranche de vrai cheddar",
            price: "5,60 €",
            raw_price: 5.6,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 12,
            popular: false,
            alcohol: false,
            category_id: 277631,
            image: null,
            modifier_groups: [57641, 57643, 57645]
          },
          {
            id: 2107249,
            uid: 2107261,
            name: "Hamburger",
            description:
              "Potato bun boulanger, sauce burger maison, tomate, laitue et 1 steak haché 100% bœuf de race",
            price: "4,95 €",
            raw_price: 4.95,
            price_unit: "€",
            alt_mod_price: 1.0,
            sort_order: 13,
            popular: false,
            alcohol: false,
            category_id: 277631,
            image: null,
            modifier_groups: [57641, 57643, 57645]
          },
          {
            id: 2107250,
            uid: 2107262,
            name: "Veggie",
            description:
              "Potato bun, sauce burger maison, 2 tomates, laitue, 2 tranches de vrai cheddar fondu (pas de substitut de steak haché)",
            price: "3,95 €",
            raw_price: 3.95,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 14,
            popular: false,
            alcohol: false,
            category_id: 277631,
            image: null,
            modifier_groups: [57641, 57643, 57645]
          },
          {
            id: 2107252,
            uid: 2107264,
            name: "Grilled cheese",
            description:
              "Potato bun, sauce burger maison et 2 tranches de vrai cheddar fondu",
            price: "2,00 €",
            raw_price: 2.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 17,
            popular: false,
            alcohol: false,
            category_id: 287131,
            image: null,
            modifier_groups: [57640, 57641, 57643]
          },
          {
            id: 2107253,
            uid: 2107265,
            name: "Sans tomate",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 17,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107254,
            uid: 2107266,
            name: "Sans fromage",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 18,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107255,
            uid: 2107267,
            name: "Sans salade",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 19,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107256,
            uid: 2107268,
            name: "Sans sauce",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 20,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107257,
            uid: 2107269,
            name: "French fries",
            description:
              "Frites fraiches maison, épluchées et découpées chez nous, double cuisson",
            price: "2,60 €",
            raw_price: 2.6,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 21,
            popular: false,
            alcohol: false,
            category_id: 277632,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107258,
            uid: 2107270,
            name: "Milkshake",
            description: "Parfum au choix",
            price: "2,50 €",
            raw_price: 2.5,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 22,
            popular: false,
            alcohol: false,
            category_id: 277633,
            image: null,
            modifier_groups: [57638]
          },
          {
            id: 2107259,
            uid: 2107271,
            name: "Vanille",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 23,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107260,
            uid: 2107272,
            name: "Banane",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 24,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107261,
            uid: 2107273,
            name: "Fraise",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 25,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107262,
            uid: 2107274,
            name: "Chocolat",
            description: null,
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 26,
            popular: false,
            alcohol: true,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107276,
            uid: 2107288,
            name: "Badoit 33 cl",
            description: "",
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 27,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107278,
            uid: 2107290,
            name: "Evian 33 cl",
            description: "",
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 28,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107280,
            uid: 2107292,
            name: "Tropicana orange",
            description: "",
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 29,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107283,
            uid: 2107295,
            name: "Tropicana multifruits",
            description: "",
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 30,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107287,
            uid: 2107299,
            name: "Heineken",
            description: "",
            price: "0,50 €",
            raw_price: 0.5,
            price_unit: "€",
            alt_mod_price: 0.5,
            sort_order: 31,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 2107438,
            uid: 2107450,
            name:
              "Votre burger sans pain et emballé  dans des feuilles de laitue ",
            description: "",
            price: "0,00 €",
            raw_price: 0.0,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 32,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          },
          {
            id: 4937600,
            uid: 4937644,
            name: "Steak",
            description: "",
            price: "0,80 €",
            raw_price: 0.8,
            price_unit: "€",
            alt_mod_price: null,
            sort_order: 33,
            popular: false,
            alcohol: false,
            category_id: 277630,
            image: null,
            modifier_groups: []
          }
        ],
        footnotes: []
      },
      current_country: { tld: "fr" },
      active_countries: [
        { name: "Allemagne", host: "deliveroo.de", tld: "de" },
        { name: "Australie", host: "deliveroo.com.au", tld: "au" },
        { name: "Belgique", host: "deliveroo.be", tld: "be" },
        { name: "Espagne", host: "deliveroo.es", tld: "es" },
        { name: "France", host: "deliveroo.fr", tld: "fr" },
        { name: "Hong-Kong", host: "deliveroo.hk", tld: "hk" },
        { name: "Irlande", host: "deliveroo.ie", tld: "ie" },
        { name: "Italie", host: "deliveroo.it", tld: "it" },
        { name: "Pays-Bas", host: "deliveroo.nl", tld: "nl" },
        { name: "Royaume-Uni", host: "deliveroo.co.uk", tld: "uk" },
        { name: "Singapore", host: "deliveroo.com.sg", tld: "sg" },
        { name: "Émirats Arabes Unis", host: "deliveroo.ae", tld: "ae" }
      ],
      locales: {
        current: { locale: "fr", name: "Français" },
        available: [
          {
            locale: "fr",
            name: "Français",
            redirect: "/fr/menu/paris/2eme-bourse/bb?day=today\u0026time=1130"
          },
          {
            locale: "en",
            name: "English",
            redirect: "/en/menu/paris/2eme-bourse/bb?day=today\u0026time=1130"
          }
        ]
      },
      currentLocale: "fr",
      show_login: false,
      enable_browser_geolocation: false,
      cacheable_mode: false,
      csrf_token: "1MnV+zXD/y66dDgnY23IWlgAmzIGlJjBWU9eHyP/9kY=",
      payment: {
        credit: {
          current_amount: 0.0,
          debit_amount: 0.0,
          remaining_amount: 0.0,
          current_amount_fmt: "0,00 €",
          debit_amount_fmt: "0,00 €",
          remaining_amount_fmt: "0,00 €",
          credits: []
        },
        allowance: {
          debit_amount: 0.0,
          debit_amount_fmt: "0,00 €",
          remaining_amount: 0.0,
          remaining_amount_fmt: "0,00 €"
        },
        outstanding: { debit_amount: 4.5, debit_amount_fmt: "4,50 €" }
      }
    };

    let menuShow = [];
    // on affiche la suite que si l'id du resto de l'objet correspond à l'id reçu du resto
    if (
      menu.restaurant.id ===
      Number(this.props.navigation.state.params.id_deliveroo)
    ) {
      for (let i = 0; i < menu.menu.categories.length; i++) {
        //boucle pour récupérer les noms des catégories et les noms des items présent dans cette catégorie
        for (let j = 0; j < menu.menu.items.length; j++) {
          if (menu.menu.categories[i].id === menu.menu.items[j].category_id) {
            menuShow.push(
              <View key={j}>
                <Text>Catégorie : {menu.menu.categories[i].name}</Text>
                <Text>{menu.menu.items[j].name}</Text>
              </View>
            );
          }
        }
      }
    }
    return (
      <ScrollView style={[styles.container, styles.style]}>
        <View>
          <Text>title: {this.props.navigation.state.params.name}</Text>
          <Text>
            id restaurant: {this.props.navigation.state.params.id_deliveroo}
          </Text>
          <Text>
            lien restaurant: {this.props.navigation.state.params.link}
          </Text>
          <View>{menuShow}</View>
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
  }
});
