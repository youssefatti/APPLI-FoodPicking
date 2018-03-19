import { StyleSheet } from "react-native";

export const StyleRestaurant = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  textAvis: {
    fontSize: 14,
    color: "#2A4D49",
    fontWeight: "bold",
    textAlign: "center"
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: "bold"
  },
  restaurantNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  rankView: {
    width: 90,
    height: 30,
    justifyContent: "center"
  }
});
