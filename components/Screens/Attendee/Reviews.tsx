import { FontAwesome6 } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";
import { useState } from "react";

interface IPropsReviews {
  navigation: any;
}

const Reviews = ({ navigation }: IPropsReviews) => {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string>("");

  const Ratings = [
    { name: "4", id: "1" },
    { name: "4", id: "2" },
    { name: "5", id: "3" },
    { name: "4", id: "4" },
    { name: "4", id: "5" },
    { name: "4", id: "6" },
    { name: "5", id: "7" },
    { name: "4", id: "8" },
  ];

  const Reviews = [
    {
      image: require("../../../assets/images/party.jpg"),
      name: "Chukwunonso Obi",
      date: "December 11, 2020",
      comment: "Great!",
      ratings: "3",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      name: "Chukwunonso Obi",
      date: "December 11, 2020",
      comment: "Great!",
      ratings: "3",
    },
    {
      image: require("../../../assets/images/party.jpg"),
      name: "Chukwunonso Obi",
      date: "December 11, 2020",
      comment: "Great!",
      ratings: "3",
    },
  ];

  return (
    <View
      style={[
        tw`flex-1 py-15 px-5`,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={[tw`gap-4`, {}]}>
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
          <Text style={[tw`text-xl font-semibold`, { color: colors.text }]}>
            Reviews (2608.8)
          </Text>
        </View>
        <ScrollView
          style={[tw``, {}]}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={tw`flex flex-row gap-3 mt-2 pb-3`}>
            {Ratings.map((items, index) => {
              const isSelected = selected === items.id;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelected(isSelected ? "" : items.id);
                  }}
                  style={[
                    tw`px-3 py-2 rounded-full flex-row items-center gap-1`,
                    {
                      borderWidth: 2,
                      borderColor: colors.buttonBackground,
                      backgroundColor: isSelected
                        ? colors.buttonBackground
                        : "transparent",
                    },
                  ]}
                >
                  <FontAwesome6
                    name="star"
                    color={
                      isSelected ? colors.buttonText : colors.buttonBackground
                    }
                  />
                  <Text
                    style={[
                      tw`font-bold`,
                      {
                        color: isSelected
                          ? colors.buttonText
                          : colors.buttonBackground,
                      },
                    ]}
                  >
                    {items.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[tw`gap-3`]}>
            {Reviews.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    tw`flex-row justify-between flex-1 border p-4 rounded-xl border-gray-300`,
                  ]}
                >
                  <View style={[tw`flex-row items-center gap-5`]}>
                    <Image
                      style={[
                        tw`h-15 w-15 rounded-full`,
                        {
                          resizeMode: "cover",
                        },
                      ]}
                      source={item.image}
                    />
                    <View style={[tw``]}>
                      <Text style={[tw`text-[16px] font-semibold`]}>
                        {item.name}
                      </Text>
                      <Text style={[tw`text-xs font-light`]}>{item.date}</Text>
                      <Text style={[tw``]}>{item.comment}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      tw`flex-row gap-1 h-7 px-2 items-center justify-start rounded-md`,
                      {
                        backgroundColor: colors.buttonBackground,
                      },
                    ]}
                  >
                    <FontAwesome6 name="star" color={colors.buttonText} />
                    <Text
                      style={[
                        tw``,
                        {
                          color: colors.buttonText,
                        },
                      ]}
                    >
                      {item.ratings}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Reviews;
