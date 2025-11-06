import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";

interface IPropsHomePage {
  navigation: any;
}

const HomePage = ({ navigation }: IPropsHomePage) => {
  const { colors } = useTheme();

  const FilterBy = [
    { name: "All" },
    { name: "Art" },
    { name: "Music" },
    { name: "Classic" },
    { name: "Sport" },
    { name: "All" },
    { name: "All" },
    { name: "All" },
  ];

  const TrendingParties = [
    {
      image: require("../../../assets/images/party.jpg"),
      date: "17 Dec",
      title: "Bastau Concert",
      category: "Music",
      location: "Grand Avenue, Indonesia",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      date: "17 Dec",
      title: "Bastau Concert",
      category: "Music",
      location: "Grand Avenue, Indonesia",
    },
  ];

  const NearbyLocation = [
    {
      image: require("../../../assets/images/party.jpg"),
      date: "17 Dec",
      title: "Bastau Concert",
      category: "Music",
      location: "Grand Avenue, Indonesia",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      date: "17 Dec",
      title: "Bastau Concert",
      category: "Music",
      location: "Grand Avenue, Indonesia",
    },
  ];

  return (
    <ScrollView
      style={[
        tw`flex-1 px-5 pt-15`,
        {
          backgroundColor: colors.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }} // prevent content cut-off at bottom
    >
      <View style={tw`gap-4`}>
        {/* Header */}
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex gap-1 flex-row items-center`}>
            <Image
              resizeMode="contain"
              style={tw`h-14 w-14`}
              source={require("../../../assets/images/Logo.png")}
            />
            <Text
              style={[tw`mb-1 text-[16px] font-bold`, { color: colors.text }]}
            >
              EPPMEBUY
            </Text>
          </View>
          <View style={tw`flex flex-row gap-2`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notifications");
              }}
              style={[
                tw`p-2 rounded-md`,
                { backgroundColor: colors.lighterBg },
              ]}
            >
              <FontAwesome name="bell" size={22} color={"#5265FF"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BookmarksScreen");
              }}
              style={[
                tw`p-2 px-2.5 rounded-md`,
                { backgroundColor: colors.lighterBg },
              ]}
            >
              <FontAwesome name="bookmark" size={22} color={"#5265FF"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[tw`flex flex-row w-full justify-between`, {}]}>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              tw`px-5 rounded-full  w-[84%] gap-2 text-base flex-row items-center justify-between`,
              { backgroundColor: colors.lighterBg },
            ]}
          >
            <TextInput
              placeholder="Search"
              placeholderTextColor={"#333"}
              style={tw`flex-1 py-3`}
              onFocus={() => navigation.replace("SearchScreen")}
            />
            <Ionicons
              name={"search"}
              size={18}
              color={"#333"}
              style={{ opacity: 0.7 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`py-3 w-[13%] rounded-md items-center `,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
          >
            <Ionicons name="filter" color={"#5265FF"} size={22} />
          </TouchableOpacity>
        </View>

        {/* Featured Section */}
        <View style={tw`gap-5`}>
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text style={[tw`text-xl font-semibold`, { color: colors.text }]}>
              Featured
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace("/(tabs)/Attendee/Featured");
              }}
            >
              <Text
                style={[tw`font-semibold`, { color: colors.buttonBackground }]}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`rounded-xl overflow-hidden`}>
            <Image
              style={tw`w-full h-45`}
              resizeMode="cover"
              source={require("../../../assets/images/party.jpg")}
            />
          </View>

          {/* Trending */}
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text style={[tw`text-xl font-semibold`, { color: colors.text }]}>
              Trending
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace("/(tabs)/Attendee/Trending");
              }}
            >
              <Text
                style={[tw`font-semibold`, { color: colors.buttonBackground }]}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex flex-row gap-3 mt-2`}>
              {FilterBy.map((items, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    tw`px-6 py-2 rounded-full`,
                    { borderWidth: 2, borderColor: colors.buttonBackground },
                  ]}
                >
                  <Text
                    style={[tw`font-bold`, { color: colors.buttonBackground }]}
                  >
                    {items.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Trending Parties */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex flex-row gap-5 mt-3`}>
              {TrendingParties.map((items, index) => (
                <View
                  key={index}
                  style={[
                    tw`rounded-2xl w-64 overflow-hidden border-1 border border-gray-200`,
                  ]}
                >
                  <ImageBackground style={tw`h-40`} source={items.image}>
                    <View
                      style={tw`py-1 px-1 bg-white w-14 absolute right-2 rounded-md top-2`}
                    >
                      <Text
                        style={[
                          tw`font-semibold`,
                          { color: colors.buttonBackground },
                        ]}
                      >
                        {items.date}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View
                    style={[
                      tw`p-4 gap-3`,
                      { backgroundColor: colors.cardColor },
                    ]}
                  >
                    <Text style={tw`text-xl`}>{items.title}</Text>
                    <View style={tw`flex flex-row gap-3 items-center`}>
                      <View
                        style={[
                          tw`px-3 py-1 rounded-full`,
                          {
                            borderWidth: 1,
                            borderColor: colors.buttonBackground,
                          },
                        ]}
                      >
                        <Text style={{ color: colors.buttonBackground }}>
                          {items.category}
                        </Text>
                      </View>
                      <Image
                        style={tw`h-8 w-8 rounded-full`}
                        resizeMode="cover"
                        source={require("../../../assets/images/party.jpg")}
                      />
                      <Text>20k+ Going</Text>
                    </View>
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <View style={tw`flex flex-row items-center`}>
                        <Ionicons
                          name="location"
                          size={22}
                          color={colors.buttonBackground}
                        />
                        <Text style={{ color: colors.text }}>
                          {items.location}
                        </Text>
                      </View>
                      <Ionicons
                        name="bookmark"
                        size={22}
                        color={colors.buttonBackground}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Nearby */}
          <View style={tw`flex flex-row justify-between items-center mt-5`}>
            <Text style={[tw`text-xl font-semibold`, { color: colors.text }]}>
              Nearby Your Location
            </Text>
            <TouchableOpacity>
              <Text
                style={[tw`font-semibold`, { color: colors.buttonBackground }]}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nearby Section */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex flex-row gap-5 mt-3 `}>
              {NearbyLocation.map((items, index) => (
                <View
                  key={index}
                  style={[
                    tw`rounded-2xl w-64 overflow-hidden border-1 border border-gray-200`,
                  ]}
                >
                  <ImageBackground style={tw`h-40`} source={items.image}>
                    <View
                      style={tw`py-1 px-1 bg-white w-14 absolute right-2 rounded-md top-2`}
                    >
                      <Text
                        style={[
                          tw`font-semibold`,
                          { color: colors.buttonBackground },
                        ]}
                      >
                        {items.date}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View
                    style={[
                      tw`p-4 gap-3`,
                      { backgroundColor: colors.cardColor },
                    ]}
                  >
                    <Text style={tw`text-xl`}>{items.title}</Text>
                    <View style={tw`flex flex-row gap-3 items-center`}>
                      <View
                        style={[
                          tw`px-3 py-1 rounded-full`,
                          {
                            borderWidth: 1,
                            borderColor: colors.buttonBackground,
                          },
                        ]}
                      >
                        <Text style={{ color: colors.buttonBackground }}>
                          {items.category}
                        </Text>
                      </View>
                      <Image
                        style={tw`h-8 w-8 rounded-full`}
                        resizeMode="cover"
                        source={require("../../../assets/images/party.jpg")}
                      />
                      <Text>20k+ Going</Text>
                    </View>
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <View style={tw`flex flex-row items-center`}>
                        <Ionicons
                          name="location"
                          size={22}
                          color={colors.buttonBackground}
                        />
                        <Text style={{ color: colors.text }}>
                          {items.location}
                        </Text>
                      </View>
                      <Ionicons
                        name="bookmark"
                        size={22}
                        color={colors.buttonBackground}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={tw`flex flex-row justify-between items-center mt-5`}>
            <Text style={[tw`text-xl font-semibold`, { color: colors.text }]}>
              Newest Event
            </Text>
            <TouchableOpacity>
              <Text
                style={[tw`font-semibold`, { color: colors.buttonBackground }]}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nearby Section */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex flex-row gap-5 mt-3 `}>
              {NearbyLocation.map((items, index) => (
                <View
                  key={index}
                  style={[
                    tw`rounded-2xl w-64 overflow-hidden border-1 border border-gray-200`,
                  ]}
                >
                  <ImageBackground style={tw`h-40`} source={items.image}>
                    <View
                      style={tw`py-1 px-1 bg-white w-14 absolute right-2 rounded-md top-2`}
                    >
                      <Text
                        style={[
                          tw`font-semibold`,
                          { color: colors.buttonBackground },
                        ]}
                      >
                        {items.date}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View
                    style={[
                      tw`p-4 gap-3`,
                      { backgroundColor: colors.cardColor },
                    ]}
                  >
                    <Text style={tw`text-xl`}>{items.title}</Text>
                    <View style={tw`flex flex-row gap-3 items-center`}>
                      <View
                        style={[
                          tw`px-3 py-1 rounded-full`,
                          {
                            borderWidth: 1,
                            borderColor: colors.buttonBackground,
                          },
                        ]}
                      >
                        <Text style={{ color: colors.buttonBackground }}>
                          {items.category}
                        </Text>
                      </View>
                      <Image
                        style={tw`h-8 w-8 rounded-full`}
                        resizeMode="cover"
                        source={require("../../../assets/images/party.jpg")}
                      />
                      <Text>20k+ Going</Text>
                    </View>
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <View style={tw`flex flex-row items-center`}>
                        <Ionicons
                          name="location"
                          size={22}
                          color={colors.buttonBackground}
                        />
                        <Text style={{ color: colors.text }}>
                          {items.location}
                        </Text>
                      </View>
                      <Ionicons
                        name="bookmark"
                        size={22}
                        color={colors.buttonBackground}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
