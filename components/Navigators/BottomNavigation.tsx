// src/navigation/TabLayout.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../../Settings/ThemeContext";
import HomePage from "../Screens/Attendee/HomePage";
import EventsScreen from "../Screens/Attendee/Events";
import LocationScreen from "../Screens/Attendee/Location";
import Calendar from "../Screens/Attendee/Calendar";
import Profile from "../Screens/Attendee/Profile";
import EventDetails from "../Screens/Attendee/EventDetails";
import Reviews from "../Screens/Attendee/Reviews";
import Search from "../Screens/Attendee/Search";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const EventsStack = createNativeStackNavigator();
const LocationStack = createNativeStackNavigator();
const CalendarStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Stack navigator for Home tab
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomePage} />
      <EventsStack.Screen name="SearchScreen" component={Search} />
      <HomeStack.Screen name="ReviewsScreen" component={Reviews} />
    </HomeStack.Navigator>
  );
}

// Stack navigator for Events tab
function EventsStackScreen() {
  return (
    <EventsStack.Navigator screenOptions={{ headerShown: false }}>
      <EventsStack.Screen name="EventsScreen" component={EventsScreen} />
      <EventsStack.Screen name="SearchScreen" component={Search} />
      <EventsStack.Screen name="Details" component={EventDetails} />
      <EventsStack.Screen name="ReviewsScreen" component={Reviews} />
    </EventsStack.Navigator>
  );
}

// Stack navigator for Location tab
function LocationStackScreen() {
  return (
    <LocationStack.Navigator screenOptions={{ headerShown: false }}>
      <LocationStack.Screen name="LocationScreen" component={LocationScreen} />
      <LocationStack.Screen name="Details" component={EventDetails} />
      <EventsStack.Screen name="SearchScreen" component={Search} />
      <LocationStack.Screen name="ReviewsScreen" component={Reviews} />
    </LocationStack.Navigator>
  );
}

// Stack navigator for Calendar tab
function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="CalendarScreen" component={Calendar} />
      <CalendarStack.Screen name="Details" component={EventDetails} />
      <EventsStack.Screen name="SearchScreen" component={Search} />
      <CalendarStack.Screen name="ReviewsScreen" component={Reviews} />
    </CalendarStack.Navigator>
  );
}

// Stack navigator for Profile tab
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
    </ProfileStack.Navigator>
  );
}

export default function TabLayout() {
  const { colors } = useTheme();

  const TabIcon = ({
    children,
    focused,
  }: {
    children: React.ReactNode;
    focused: boolean;
  }) => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        width: 50,
        marginTop: 15,
        height: 50,
        backgroundColor: focused ? colors.buttonBackground : colors.lighterBg,
      }}
    >
      {children}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: colors.buttonBackground,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Ionicons name="home" size={24} color={color} />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <MaterialIcons name="event-note" size={24} color={color} />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationStackScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <MaterialCommunityIcons name="map" size={24} color={color} />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <FontAwesome5 name="calendar" size={22} color={color} />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <FontAwesome6 name="user-large" size={20} color={color} />
            </TabIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
