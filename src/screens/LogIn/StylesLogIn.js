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
    borderColor: "white",
    borderBottomWidth: 1,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    //marginTop: 10,
    paddingLeft: 20,
    height: 50,
    width: "100%",
    //height: 50,
    color: "white"
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
    color: "grey"
  },
  toggleTextLogin: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  signUpLoginView: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
    //height: 50
  }
});
