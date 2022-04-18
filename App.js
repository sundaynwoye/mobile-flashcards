import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import DeckInfo from "./components/DeckInfo";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from './reducers/index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

function FlashcardStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

const Tab = createBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#0052D4',
                tabBarInactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen name="Decks" component={DeckList} options={{
                tabBarLabel: 'Decks',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="md-bookmarks" size={size} color={color} />
                ),
                tabBarBadge: 3,
            }} />
            <Tab.Screen name="AddDeck" component={AddDeck} options={{
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="plus-square" size={size} color={color} />
                ),
            }} />
        </Tab.Navigator>
    );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
          <FlashcardStatusBar backgroundColor={"#00BCD4"} barStyle="dark-content" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerStyle: {
                        backgroundColor: '#00BCD4',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="DeckInfo" component={DeckInfo} options={{
                        title: 'Deck Detail'
                    }} />
                    <Stack.Screen name="AddCard" component={AddCard} options={{
                        title: 'Add Card'
                    }} />
                    <Stack.Screen name="Quiz" component={Quiz} options={
                        ({ route }) => {
                            const { title } = route.params;
                            return {
                                title: `${title} Quiz`
                            }
                        }
                    } />
                </Stack.Navigator>
            </NavigationContainer>
      </Provider>
  );
}

