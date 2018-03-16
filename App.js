import { StackNavigator } from "react-navigation";
import Home from "./src/screens/Home";
import Restaurants from "./src/screens/Restaurants";
import Menu from "./src/screens/Menu";
import LogInScreen from "./src/screens/LogIn/LogInScreen";

import Payment from "./src/screens/Payment";
import Confirmation from "./src/screens/Confirmation";

console.ignoredYellowBox = [
  "Warning: componentWill",
  "Remote debugger",
  "Warning: Each child",
  "Warning: Failed child"
];

const App = StackNavigator({
  LogIn: {
    screen: LogInScreen
  },
  Home: {
    screen: Home
  },
  Restaurants: {
    screen: Restaurants
  },
  Menu: {
    screen: Menu
  },
  Payment: {
    screen: Payment
  },
  Confirmation: {
    screen: Confirmation
  }
});
export default App;
