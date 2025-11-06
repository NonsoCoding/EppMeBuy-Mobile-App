import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { useTheme } from "../../../Settings/ThemeContext";

interface IPropsBookmarks {
    navigation: any
}

const Trending = ({
  navigation
}: IPropsBookmarks) => {

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
    
    const bookmarkedParties = [
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
        <View style={[tw`pt-12 pb-4 px-5 flex-1 gap-3`, {
        }]}>
            <View>
                 <View style={tw`flex flex-row items-center justify-between gap-3 py-4`}>
                    <View style={[tw`flex-row items-center gap-3`]}>
        <TouchableOpacity onPress={() => navigation.replace("/(tabs)/Attendee/HomePage")}>
          <FontAwesome6 name="arrow-left-long" size={30} color={colors.buttonBackground} />
        </TouchableOpacity>
        <Text style={[tw`text-xl`, { color: colors.text }]}>
          Trending
        </Text>
                    </View>
                    <TouchableOpacity style={[tw`px-2 py-2 rounded-lg`, {
                        backgroundColor: colors.lighterBg
                    }]}>
                        <Feather size={20} name="search" color={colors.buttonBackground}/>
                    </TouchableOpacity>
                </View>
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
            </View>
                <ScrollView style={{
                }} contentContainerStyle={{
                 }} showsVerticalScrollIndicator={false}>
            <View style={tw`gap-5 mt-3 `}>
              {bookmarkedParties.map((items, index) => (
               <View
  key={index}
  style={[
    tw`rounded-2xl flex-row overflow-hidden border-1 border border-gray-200`,
  ]}
                >
                   <ImageBackground resizeMode="cover" style={[tw`w-35  h-40`]} source={items.image}>
  <View
    style={tw`py-1 px-3 bg-white w-18 absolute right-2 rounded-md top-2`}
  >
    <Text style={{ color: colors.buttonBackground }}>{items.date}</Text>
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
      <Text style={{ color: colors.buttonBackground }}>{items.category}</Text>
                              </View>
  <View style={tw`flex-wrap items-center gap-2`}>
                              <View style={[tw`flex-row items-center gap-2`, {
                                  
                              }]}>
                                  
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
      <Ionicons name="location" size={18} color={colors.buttonBackground} />
      <Text style={[tw`ml-1 text-xs flex-shrink`, { color: colors.text }]} numberOfLines={1}>
        {items.location}
      </Text>
    </View>
    <Ionicons name="bookmark" size={20} color={colors.buttonBackground} />
  </View>
</View>

                  </View>
              ))}
            </View>
          </ScrollView>
        </View>
    )
}

export default Trending;