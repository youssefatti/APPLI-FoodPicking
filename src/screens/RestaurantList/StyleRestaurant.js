import { StyleSheet } from "react-native";

export const StyleRestaurant = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  textAvis: {
    fontSize: 14,
    color: "#7FC149",
    fontWeight: "bold",
    textAlign: "center"
  },
  restaurantName: {
    fontSize: 16,
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
  },
  UserNav: {
    backgroundColor: "white",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#DDDFE3"
  }
});
