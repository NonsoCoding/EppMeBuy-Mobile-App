import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";

interface IpropsEvent {
  navigation: any;
}

export default function EventsScreen({ navigation }: IpropsEvent) {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState("Upcoming");

  const FilterBy = [
    { name: "Upcoming" },
    { name: "Past Events" },
    { name: "My Events" },
  ];

  const EventList = [
    {
      image: require("../../../assets/images/party.jpg"),
      date: "17 Dec",
      title: "Bastau Concert",
      category: "Music",
      location: "Grand Avenue, Indonesia",
      type: "Upcoming",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      date: "22 Jan",
      title: "Summer Jam",
      category: "Festival",
      location: "Abuja, Nigeria",
      type: "Past Events",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      date: "14 Nov",
      title: "Private Tech Meetup",
      category: "Networking",
      location: "Lagos, Nigeria",
      type: "My Events",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      date: "17 Dec",
      title: "Bastau Concert",
      category: "Music",
      location: "Grand Avenue, Indonesia",
      type: "Upcoming",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      date: "22 Jan",
      title: "Summer Jam",
      category: "Festival",
      location: "Abuja, Nigeria",
      type: "Past Events",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      date: "14 Nov",
      title: "Private Tech Meetup",
      category: "Networking",
      location: "Lagos, Nigeria",
      type: "My Events",
    },
  ];

  const filteredEvents = EventList.filter(
    (event) => event.type === activeFilter
  );

  return (
    <View
      style={[
        tw`pt-15 px-5 flex-1`,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={[tw`flex-1`]}>
        <View style={tw`flex flex-row items-center justify-between gap-3 py-4`}>
          <View style={[tw`flex-row items-center gap-3`]}>
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
            <Text style={[tw`text-xl font-semibold`, { color: colors.text }]}>
              Event List
            </Text>
          </View>
          <TouchableOpacity
            style={[
              tw`px-2 py-2 rounded-lg`,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
          >
            <Feather size={20} name="search" color={colors.buttonBackground} />
          </TouchableOpacity>
        </View>
        <View style={[tw`flex-row justify-between pb-3`, {}]}>
          {FilterBy.map((items, index) => {
            const isActive = items.name === activeFilter;
            return (
              <TouchableOpacity
                onPress={() => setActiveFilter(items.name)}
                style={[
                  tw`border px-5 py-1.9 rounded-full border-2`,
                  {
                    borderColor: isActive
                      ? colors.buttonBackground
                      : colors.buttonBackground,
                    backgroundColor: isActive
                      ? colors.buttonBackground
                      : "white",
                  },
                ]}
                key={index}
              >
                <Text
                  style={[
                    tw`font-semibold`,
                    {
                      color: isActive ? "white" : colors.buttonBackground,
                    },
                  ]}
                >
                  {items.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView
          style={[
            tw`pt-2`,
            {
              backgroundColor: "transparent",
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`gap-5 pb-5`}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((items, index) => (
                <View
                  style={[
                    tw`border-1 border border-gray-200 rounded-2xl p-3 gap-3`,
                  ]}
                  //  onPress={() => {
                  //           route.navigate("/Authentication/Attendee/EventDetails");
                  //       }}
                  key={index}
                >
                  <View
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
                          tw`py-1 rounded-full px-3 items-center self-start`,
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
                      <View
                        style={tw`flex-row items-center justify-between mt-2`}
                      >
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
                  </View>
                  {activeFilter === "Upcoming" && (
                    <TouchableOpacity
                      style={[
                        tw`h-9 items-center px-3 items-center justify-center rounded-full`,
                        {
                          backgroundColor: colors.buttonBackground,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          tw`font-semibold`,
                          {
                            color: colors.buttonText,
                          },
                        ]}
                      >
                        View Tickets
                      </Text>
                    </TouchableOpacity>
                  )}
                  {activeFilter === "Past Events" && (
                    <View style={[tw`flex-row flex-1 gap-3 justify-between`]}>
                      <TouchableOpacity
                        style={[
                          tw`h-9 flex-1 items-center px-3 items-center justify-center rounded-full`,
                          {
                            backgroundColor: colors.buttonBackground,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            tw`font-semibold`,
                            {
                              color: colors.buttonText,
                            },
                          ]}
                        >
                          Add Documentation
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("ReviewsScreen");
                        }}
                        style={[
                          tw`h-9 items-center px-3 items-center justify-center  border border-2 rounded-full`,
                          {
                            borderColor: colors.buttonBackground,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            tw`font-semibold`,
                            {
                              color: colors.buttonBackground,
                            },
                          ]}
                        >
                          See reviews
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {activeFilter === "My Events" && (
                    <View style={[tw`flex-row flex-1 justify-between`]}>
                      <TouchableOpacity
                        style={[
                          tw`h-9 items-center px-3 items-center justify-center rounded-full`,
                          {
                            backgroundColor: colors.buttonBackground,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            tw`font-semibold`,
                            {
                              color: colors.buttonText,
                            },
                          ]}
                        >
                          Add Documentation
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(
                            "/Authentication/Attendee/Reviews"
                          );
                        }}
                        style={[
                          tw`h-9 items-center px-3 items-center justify-center  border border-2 rounded-full`,
                          {
                            borderColor: colors.buttonBackground,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            tw`font-semibold`,
                            {
                              color: colors.buttonBackground,
                            },
                          ]}
                        >
                          See reviews
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          tw`h-9 items-center px-2 items-center justify-center  rounded-lg`,
                          {
                            backgroundColor: colors.lighterBg,
                          },
                        ]}
                      >
                        <MaterialIcons
                          size={20}
                          name="qr-code-scanner"
                          color={colors.buttonBackground}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <Text style={[tw`text-center mt-10`, { color: colors.text }]}>
                No events found.
              </Text>
            )}
          </View>
        </ScrollView>
        {activeFilter === "My Events" && (
          <TouchableOpacity
            onPress={() => [navigation.navigate("CreateEventScreen")]}
            style={[
              tw`self-end w-13 h-13 rounded-full absolute bottom-20 items-center justify-center`,
              {
                backgroundColor: colors.buttonBackground,
              },
            ]}
          >
            <FontAwesome6 name="plus" color={colors.buttonText} size={30} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("/Authentication/Attendee/ExploreEvents");
          }}
          style={[
            tw`py-4 mb-4 absolute rounded-full w-full bottom-0 items-center`,
            {
              backgroundColor: colors.buttonBackground,
            },
          ]}
        >
          <Text
            style={[
              tw`font-semibold`,
              {
                color: colors.buttonText,
              },
            ]}
          >
            Explore Events
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
