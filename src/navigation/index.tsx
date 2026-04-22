import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListDetailsScreen from "../../app/ListDetails/ListDetailsScreen";
import ListsScreen from "../../app/Lists/ListsScreen";
import SettingsScreen from "../../app/Settings/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lists" component={ListsScreen} />
        <Stack.Screen name="Details" component={ListDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
