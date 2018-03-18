import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  textButton: {
    color: "rgb(50,75,72)",
    width: "100%",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  button: {
    //flex: 1,
    width: "60%",
    height: 40,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  foodPicking: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  }
});
