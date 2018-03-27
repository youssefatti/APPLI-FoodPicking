import { StyleSheet } from "react-native";

export const StyleRestaurant = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  textAvis: {
    fontSize: 14,
    color: "#7FC149",
    textAlign: "center",
    fontFamily: "Lato-Bold"
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: "Lato-Bold"
  },
  restaurantNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1
  },
  rankView: {
    width: 90,
    justifyContent: "center"
  },
  UserNav: {
    backgroundColor: "white",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#DDDFE3"
  },
  flex: {
    flex: 1
  },
  menuTag: {
    flexDirection: "row",
    paddingTop: 10,
    flexWrap: "wrap"
  }
});
