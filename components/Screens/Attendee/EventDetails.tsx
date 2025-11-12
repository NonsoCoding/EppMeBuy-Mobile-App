import { Entypo, Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";

interface IPropsEventDetails {
  navigation: any;
}

const EventDetails = ({ navigation }: IPropsEventDetails) => {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <View
      style={[
        tw`flex-1`,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={[tw`gap-5 flex-1`]}>
        <ImageBackground
          style={[tw`h-80 pt-16 px-5`]}
          source={require("../../../assets/images/party.jpg")}
        >
          <TouchableOpacity
            style={[
              tw`p-3 rounded-full self-start`,
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
        </ImageBackground>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[tw`px-5 gap-4 pb-10`, {}]}>
            <View style={[tw`flex-row justify-between items-center`]}>
              <View
                style={[
                  tw`py-1 px-3 border-1 border rounded-full`,
                  {
                    borderColor: colors.buttonBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-xs font-semibold`,
                    {
                      color: colors.buttonBackground,
                    },
                  ]}
                >
                  Music
                </Text>
              </View>
              <View style={[tw`flex-row items-center gap-2`]}>
                <Image
                  style={[tw`h-5 w-5 rounded-full`, {}]}
                  source={require("../../../assets/images/party.jpg")}
                />
                <Text style={[tw`text-xs font-semibold`]}>112,4093</Text>
                <FontAwesome6
                  name="arrow-right-long"
                  size={15}
                  color={colors.buttonBackground}
                />
              </View>
            </View>
            <View style={[tw`gap-5`, {}]}>
              <Text
                style={[
                  tw`text-2xl font-semibold`,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Bastau Concert
              </Text>
              <View style={[tw`flex flex-row gap-3`, {}]}>
                <View
                  style={[
                    tw`h-13 w-13 rounded-full items-center justify-center`,
                    {
                      backgroundColor: colors.lighterBg,
                    },
                  ]}
                >
                  <Ionicons
                    size={17}
                    name="calendar"
                    color={colors.buttonBackground}
                  />
                </View>
                <View style={[tw`gap-2`, {}]}>
                  <Text style={[tw`text-[16px] font-semibold`, {}]}>
                    December 17, 2022
                  </Text>
                  <Text>Saturday, 4:00 - 10:00PM</Text>
                  <TouchableOpacity
                    style={[
                      tw`py-1.4 w-40 rounded-full justify-center items-center border border-2`,
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
                      Add to My Calendar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[tw`flex flex-row gap-3`, {}]}>
                <View
                  style={[
                    tw`h-13 w-13 rounded-full items-center justify-center`,
                    {
                      backgroundColor: colors.lighterBg,
                    },
                  ]}
                >
                  <Ionicons
                    size={17}
                    name="location"
                    color={colors.buttonBackground}
                  />
                </View>
                <View style={[tw`gap-2`, {}]}>
                  <Text style={[tw`text-[16px] font-semibold`, {}]}>
                    Grand Avenue Center
                  </Text>
                  <Text>49 SBY St, Surubabba, Indonesia</Text>
                  <TouchableOpacity
                    style={[
                      tw`py-1.4 w-30 rounded-full justify-center items-center border border-2`,
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
                      See on Maps
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  tw`flex-row items-center items-center justify-center py-4 rounded-full gap-2`,
                  {
                    backgroundColor: colors.buttonBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    tw`font-bold`,
                    {
                      color: colors.buttonText,
                    },
                  ]}
                >
                  View Rating
                </Text>
                <FontAwesome6
                  name="arrow-right-long"
                  size={17}
                  color={colors.buttonText}
                />
              </TouchableOpacity>
              <View
                style={[
                  tw`border border-[#D3D3D3]`,
                  {
                    borderWidth: 0.3,
                  },
                ]}
              ></View>
              <View>
                <View style={[tw`flex-row items-center justify-between`, {}]}>
                  <View style={[tw`flex-row items-center gap-3`]}>
                    <TouchableOpacity>
                      <Image
                        style={[tw`h-13 w-13 rounded-full`]}
                        source={require("../../../assets/images/party.jpg")}
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={[tw`text-xl font-semibold`, {}]}>
                        Albert Flores
                      </Text>
                      <Text>Organizer</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      tw`py-1.5 px-3 border border-2 rounded-full`,
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
                      Follow
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[tw`gap-3`]}>
                <Text style={[tw`text-xl font-semibold`, {}]}>About Event</Text>
                <Text style={[tw`text-gray-500`, {}]}>
                  Lorem ipsum ionfejlvd infoljds nufbaeil j fhieiinvinnieove
                  inou wanl njlsekfdnive niervivqi
                </Text>
              </View>
              <View style={[tw`gap-3`]}>
                <Text style={[tw`text-xl font-semibold`, {}]}>Location</Text>
                <MapView
                  style={tw`w-full h-60 rounded-lg`}
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
                        source={{
                          uri: "https://randomuser.me/api/portraits/men/1.jpg",
                        }}
                        style={tw`w-10 h-10 rounded-full`}
                      />
                    </View>
                  </Marker>
                </MapView>
              </View>
              <View style={[tw`gap-2`, {}]}>
                <Text style={[tw`text-xl font-semibold`, {}]}>Reviews</Text>
                <Text
                  style={[
                    tw``,
                    {
                      color: colors.buttonBackground,
                      fontStyle: "italic",
                    },
                  ]}
                >
                  Coming Soon after event
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          tw`border flex-row border-gray-300 rounded-t-md justify-between px-5 py-6`,
        ]}
      >
        <View style={[tw`flex-row gap-4 items-center`]}>
          <TouchableOpacity
            style={[
              tw`rounded-full p-3`,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
          >
            <Entypo name="share" size={25} color={colors.buttonBackground} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`rounded-full p-3`,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
          >
            <Feather
              name="bookmark"
              size={25}
              color={colors.buttonBackground}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BuyTicketScreen");
          }}
          style={[
            tw`flex-row items-center items-center justify-center w-[60%] py-4 rounded-full gap-2`,
            {
              backgroundColor: colors.buttonBackground,
            },
          ]}
        >
          <Text
            style={[
              tw`font-bold`,
              {
                color: colors.buttonText,
              },
            ]}
          >
            Buy Ticket
          </Text>
          <FontAwesome6
            name="arrow-right-long"
            size={17}
            color={colors.buttonText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventDetails;
