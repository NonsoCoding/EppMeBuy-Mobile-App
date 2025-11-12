import { Feather, FontAwesome6 } from "@expo/vector-icons";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { useTheme } from "../../../Settings/ThemeContext";

interface IFeaturedProps {
  navigation: any;
}

const Featured = ({ navigation }: IFeaturedProps) => {
  const { colors } = useTheme();

  const featured = [
    {
      image: require("../../../assets/images/party.jpg"),
      title: "International Concert",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      title: "International Concert",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      title: "International Concert",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      title: "International Concert",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      title: "International Concert",
    },
  ];

  return (
    <View
      style={[
        tw`pt-12 flex-1 px-5 flex-1`,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={[tw`flex-1`, {}]}>
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
            <Text style={[tw`text-xl`, { color: colors.text }]}>Featured</Text>
          </View>
          <TouchableOpacity
            style={[
              tw`px-2 py-2 rounded-lg`,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
          >
            <Feather
              size={25}
              name="more-vertical"
              color={colors.buttonBackground}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[tw`gap-3`, {}]}>
            {featured.map((items, index) => {
              return (
                <View key={index} style={[tw`rounded-lg overflow-hidden`]}>
                  <ImageBackground
                    source={items.image}
                    resizeMode="cover"
                    style={[tw`h-40 p-5 gap-2 justify-center `, {}]}
                  >
                    <Text
                      style={[
                        tw`font-bold text-2xl`,
                        {
                          color: colors.buttonText,
                        },
                      ]}
                    >
                      {items.title}
                    </Text>
                    <TouchableOpacity
                      style={[
                        tw`w-25 h-8 items-center justify-center rounded-full`,
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
                        Book Now
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Featured;
