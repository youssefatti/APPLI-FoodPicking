import { StackNavigator } from "react-navigation";
import Restaurants from "./src/screens/Restaurants";
import Menu from "./src/screens/Menu";

console.ignoredYellowBox = ["Warning: componentWill", "Remote debugger"];

const App = StackNavigator({
  Restaurants: {
    screen: Restaurants
  },
  Menu: {
    screen: Menu
  }
});
export default App;
