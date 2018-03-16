import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(243,243,243)"
    //padding: 10
  },
  inputText: {
    borderColor: "grey",
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    paddingLeft: 20,
    width: "100%",
    height: 50,
    color: "rgb(79,79,79)"
  },
  textButton: {
    color: "white",
    width: "100%",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "rgb(69,95,219)",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  SingUpLoginContain: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10
  },
  toggleTouchLogin: {
    flex: 1,
    //backgroundColor: "red",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  toggleTouchSignUp: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  toggleTextSignUp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(91,139,201)"
  },
  toggleTextLogin: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(222,214,206)"
  }
});
