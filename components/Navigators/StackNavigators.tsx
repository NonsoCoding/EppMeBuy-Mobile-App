// src/navigation/StackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "./BottomNavigation";
import EventDetails from "../Screens/Attendee/EventDetails";
import Login from "../Screens/Authentication/Login";
import IntroScreen from "../Screens/Authentication/IntroScreen";
import { ThemeProvider } from "../../Settings/ThemeContext";
import SignUp from "../Screens/Authentication/SignUp";
import Otp from "../Screens/Authentication/Otp";
import ForgottenPassword from "../Screens/Authentication/ForgottenPassword";
import HomePage from "../Screens/Attendee/HomePage";
import PhoneNumber from "../Screens/Authentication/PhoneNumber";
import PersonalInfo from "../Screens/Authentication/PersonalInfo";
import ResetPassword from "../Screens/Authentication/ResetPassword";
import EmailResetLink from "../Screens/Authentication/EmailResetLink";
import PhoneResetLink from "../Screens/Authentication/PhoneResetLink";
import Reviews from "../Screens/Attendee/Reviews";
import CreateEvent from "../Screens/Host/CreateEvent/Index";
import Notifications from "../Screens/Attendee/Notifications";
import Bookmarks from "../Screens/Attendee/Bookmarks";
import Search from "../Screens/Attendee/Search";
import Featured from "../Screens/Attendee/Featured";
import Trending from "../Screens/Attendee/Trending";
import BuyTicket from "../Screens/Attendee/TicketPayments.tsx/BuyTicket";
import ExploreEvents from "../Screens/Attendee/ExploreEvents";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <ThemeProvider>
      <Stack.Navigator
        initialRouteName="IntroScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Login or intro screen */}
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="AttendeeHomePage" component={HomePage} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneNumberScreen"
          component={PhoneNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInfo}
          options={{ headerShown: false }}
        />
        {/* The bottom tabs */}
        <Stack.Screen
          name="Tabs"
          component={TabLayout}
          options={{ headerShown: false }}
        />

        {/* Any other screens */}
        <Stack.Screen
          name="Details"
          component={EventDetails}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="CreateEventScreen"
          component={CreateEvent}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPassword}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="BookmarksScreen"
          component={Bookmarks}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={Search}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="ResetEmailLinkScreen"
          component={EmailResetLink}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="TrendingScreen"
          component={Trending}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="ExploreEventsScreen"
          component={ExploreEvents}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="BuyTicketScreen"
          component={BuyTicket}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="FeaturedScreen"
          component={Featured}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="ResetPhoneLinkScreen"
          component={PhoneResetLink}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="ReviewsScreen"
          component={Reviews}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="ForgottenPassword"
          component={ForgottenPassword}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
};

export default StackNavigator;
