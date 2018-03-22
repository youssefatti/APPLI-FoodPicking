import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(50,75,72)"
    //padding: 10
  },
  inputText: {
    //flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    fontSize: 20,
    lineHeight: 30,
    paddingLeft: 20,
    height: 50,
    width: "90%",
    color: "white",
    marginTop: 30
  },
  SingUpLoginContain: {
    flex: 1,
    justifyContent: "space-around"
    //backgroundColor: "white",
    // paddingLeft: 10,
    // paddingRight: 10
  },
  toggleTouchLogin: {
    //flex: 1,
    //backgroundColor: "red",
    //height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  toggleTouchSignUp: {
    //flex: 1,
    //backgroundColor: "white",
    //height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  toggleTextSignUp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7FC149"
  },
  toggleTextLogin: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  signUpLoginViewIn: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
    //height: 50
  },
  signUpLoginViewFirst: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  signUpLoginView: {
    flex: 1,
    justifyContent: "center"
  }
});
