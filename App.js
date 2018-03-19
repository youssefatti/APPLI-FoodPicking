import { StackNavigator } from "react-navigation";
import Home from "./src/screens/Home/Home";
import Restaurants from "./src/screens/RestaurantList/RestaurantsList";
import Menu from "./src/screens/Menu/Menu";
import LogInScreen from "./src/screens/LogIn/LogInScreen";
import Account from "./src/screens/Account/Account";
import Favorites from "./src/screens/Favorites/Favorites";

import Payment from "./src/screens/Payment/Payment";
import Confirmation from "./src/screens/Confirmation/Confirmation";

console.ignoredYellowBox = [
  "Remote debugger",
  "Warning: Each child",
  "Warning"
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
  },
  Account: {
    screen: Account
  },
  Favorites: {
    screen: Favorites
  }
});
export default App;
