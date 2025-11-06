import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { useTheme } from "../../../Settings/ThemeContext";

interface IPropsSearch {
  navigation: any;
}

const ExploreEvents = ({ navigation }: IPropsSearch) => {
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

  const partiesEvents = [
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
    <View
      style={[
        tw`flex-1 pt-12 px-5`,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View>
        <View style={[tw`flex-row py-4 items-center gap-3`]}>
          <TouchableOpacity
            style={[
              tw`p-3 rounded-full`,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome6
              name="arrow-left-long"
              size={17}
              color={colors.buttonBackground}
            />
          </TouchableOpacity>
          <Text style={[tw`text-xl`, { color: colors.text }]}>
            Explore Event
          </Text>
        </View>
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
              onFocus={() =>
                navigation.navigate("/Authentication/Attendee/Search")
              }
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
        <ScrollView
          style={[tw`pt-3`, {}]}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={tw`flex flex-row gap-3 mt-2 pb-3`}>
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
      </View>
      <ScrollView
        style={{}}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`gap-5 pb-5`}>
          {partiesEvents.map((items, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("/Authentication/Attendee/EventDetails");
              }}
              key={index}
              style={[
                tw`rounded-2xl flex-row overflow-hidden border-1 border border-gray-200`,
              ]}
            >
              <ImageBackground
                resizeMode="cover"
                style={[tw`w-35  h-40`]}
                source={items.image}
              >
                <View
                  style={tw`py-1 px-1 bg-white w-14 absolute right-2 rounded-md top-2`}
                >
                  <Text style={{ color: colors.buttonBackground }}>
                    {items.date}
                  </Text>
                </View>
              </ImageBackground>

              <View
                style={[
                  tw`flex-2 p-3 justify-between`,
                  { backgroundColor: colors.cardColor },
                ]}
              >
                <Text style={tw`text-lg font-bold`} numberOfLines={1}>
                  {items.title}
                </Text>
                <View
                  style={[
                    tw`py-1 rounded-full w-15 items-center`,
                    { borderWidth: 1, borderColor: colors.buttonBackground },
                  ]}
                >
                  <Text style={{ color: colors.buttonBackground }}>
                    {items.category}
                  </Text>
                </View>
                <View style={tw`flex-wrap items-center gap-2`}>
                  <View style={[tw`flex-row items-center gap-2`, {}]}>
                    <Image
                      style={tw`h-6 w-6 rounded-full`}
                      resizeMode="cover"
                      source={require("../../../assets/images/party.jpg")}
                    />
                    <Text style={tw`text-xs`}>20k+ Going</Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center justify-between mt-2`}>
                  <View style={tw`flex-row items-center w-[80%]`}>
                    <Ionicons
                      name="location"
                      size={18}
                      color={colors.buttonBackground}
                    />
                    <Text
                      style={[
                        tw`ml-1 text-xs flex-shrink`,
                        { color: colors.text },
                      ]}
                      numberOfLines={1}
                    >
                      {items.location}
                    </Text>
                  </View>
                  <Ionicons
                    name="bookmark"
                    size={20}
                    color={colors.buttonBackground}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExploreEvents;
