import React from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text
} from "react-native";

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[styles.container, styles.style, styles.bgColorHome]}>
        <View style={styles.blocLogo}>
          <TouchableOpacity
            onPress={() =>
              navigate("Restaurants", {
                name: "Restaurant"
              })
            }
          >
            <View style={styles.picHome}>
              <Text style={styles.logoText}>FoodPicking</Text>
            </View>
          </TouchableOpacity>
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
  bgColorHome: {
    backgroundColor: "pink"
  },
  blocLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200
  },
  picHome: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#41CBD4",
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: {
    color: "#ffffff"
  }
});
