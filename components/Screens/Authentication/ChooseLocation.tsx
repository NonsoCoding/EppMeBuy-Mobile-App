import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";

interface IPropsChooseLocation {
  navigation: any;
}

const ChooseLocation = ({
  navigation
}: IPropsChooseLocation) => {
  const { colors } = useTheme();
  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [locationName, setLocationName] = useState("San Francisco, CA");
  const [searchQuery, setSearchQuery] = useState("");

  // Predefined locations for search
  const locations = [
    { name: "San Francisco, CA", latitude: 37.7749, longitude: -122.4194 },
    { name: "New York, NY", latitude: 40.7128, longitude: -74.0060 },
    { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
    { name: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
    { name: "Miami, FL", latitude: 25.7617, longitude: -80.1918 },
    { name: "Seattle, WA", latitude: 47.6062, longitude: -122.3321 },
    { name: "Boston, MA", latitude: 42.3601, longitude: -71.0589 },
    { name: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
  ];

 const handleSearch = async () => {
  try {
    const geocoded = await Location.geocodeAsync(searchQuery);
    if (geocoded.length > 0) {
      const { latitude, longitude } = geocoded[0];
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
        setLocationName(searchQuery);
        navigation.replace("/(tabs)/Attendee/HomePage")
    }
  } catch (error) {
    Alert.alert("Error", "Could not find location");
  }
};

  const handleAddLocation = () => {
    Alert.alert(
      "Location Added",
      `Location: ${locationName}\nCoordinates: ${region.latitude.toFixed(4)}, ${region.longitude.toFixed(4)}`
    );
  };

  return (
    <View style={[tw`flex-1 pt-12`, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={tw`flex flex-row items-center gap-3 px-5 py-4`}>
        <TouchableOpacity onPress={() => navigation.back()}>
          <FontAwesome6 name="arrow-left-long" size={30} color={colors.buttonBackground} />
        </TouchableOpacity>
        <Text style={[tw`text-xl`, { color: colors.text }]}>
          Choose Location
        </Text>
      </View>

      {/* Map */}
      <View style={tw`flex-1`}>
        <MapView
          style={tw`w-full h-full`}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker coordinate={region}>
            <View
              style={[
                tw`w-12 h-12 rounded-full border-2 items-center justify-center`,
                { borderColor: "#4B6BFB", backgroundColor: "#fff" },
              ]}
            >
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                style={tw`w-10 h-10 rounded-full`}
              />
            </View>
          </Marker>
        </MapView>

        {/* Search Overlay */}
        <View style={tw`absolute top-5 left-5 right-5`}>
          <View style={tw`px-3 py-3 bg-white rounded-xl shadow-lg`}>
            {/* Location Display */}
            <View
              style={[
                tw`rounded-xl px-4 py-3 flex-row items-center gap-2 mb-3`,
                { backgroundColor: colors.lighterBackground },
              ]}
            >
              <Text style={{ color: colors.text, opacity: 0.8, flex: 1 }}>
                {locationName}
              </Text>
              <Ionicons
                name="location"
                size={20}
                color={colors.buttonBackground}
              />
            </View>

            {/* Search Input */}
            <View
              style={[
                tw`rounded-xl px-4 flex-row items-center`,
                { backgroundColor: "#D3D3D3" },
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Search location..."
                placeholderTextColor="#B0B0B0"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                style={[tw`flex-1 text py-3`, { color: "#333" }]}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={handleSearch}>
                  <Ionicons name="arrow-forward-circle" size={24} color={colors.buttonBackground} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Add Location Button */}
        <View style={tw`absolute bottom-8 left-6 right-6`}>
          <TouchableOpacity
                      onPress={() => {
                          navigation.replace("/(tabs)/Attendee/HomePage")
            }}
            activeOpacity={0.8}
            style={[
              tw`py-4 items-center rounded-lg shadow-lg`,
              { backgroundColor: colors.buttonBackground },
            ]}
          >
            <Text style={tw`text-white font-semibold`}>
              Add My Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChooseLocation;