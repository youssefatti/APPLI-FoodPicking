import { StackNavigator } from "react-navigation";
import Home from "./src/screens/Home";
import Restaurants from "./src/screens/Restaurants";
import Menu from "./src/screens/Menu";
import Cart from "./src/screens/Cart";

console.ignoredYellowBox = ["Warning: componentWill", "Remote debugger"];

const App = StackNavigator({
  Home: {
    screen: Home
  },
  Restaurants: {
    screen: Restaurants
  },
  Menu: {
    screen: Menu
  },
  Cart: {
    screen: Cart
  }
});
export default App;
