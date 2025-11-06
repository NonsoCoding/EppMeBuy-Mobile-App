import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { useTheme } from "../../../Settings/ThemeContext";

interface IPropsNotification {
  navigation: any;
}

const Notifications = ({ navigation }: IPropsNotification) => {
  const { colors } = useTheme();

  const Notification = [
    {
      title: "Payment Successful",
      image: require("../../../assets/images/Logo.png"),
      notifyInfo: "I just got a notification for you to wi na lottery",
      date: "Today, December 25, 2022",
    },
    {
      title: "Payment Successful",
      image: require("../../../assets/images/Logo.png"),
      notifyInfo: "I just got a notification for you to wi na lottery",
      date: "Today, December 25, 2022",
    },
    {
      title: "Payment Successful",
      image: require("../../../assets/images/Logo.png"),
      notifyInfo: "I just got a notification for you to wi na lottery",
      date: "Today, December 25, 2022",
    },
    {
      title: "Payment Successful",
      image: require("../../../assets/images/Logo.png"),
      notifyInfo: "I just got a notification for you to wi na lottery",
      date: "Today, December 25, 2022",
    },
  ];

  return (
    <View style={[tw`py-12 px-5`, {}]}>
      <View>
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
              Notification
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
            <Feather
              size={25}
              name="more-vertical"
              color={colors.buttonBackground}
            />
          </TouchableOpacity>
        </View>
        <View style={[tw`gap-4`]}>
          {Notification.map((items, index) => {
            return (
              <View key={index} style={[tw`gap-4 text-string`]}>
                <Text>{items.date}</Text>
                <TouchableOpacity
                  style={[
                    tw`flex flex-row items-center gap-3 border-1 border rounded-lg border-gray-400 p-3`,
                  ]}
                >
                  <Image
                    style={[tw`h-16 w-16`]}
                    resizeMode="contain"
                    source={items.image}
                  />
                  <View style={[tw`w-[80%] gap-2`]}>
                    <Text
                      style={[
                        tw`font-semibold`,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      {items.title}
                    </Text>
                    <Text>{items.notifyInfo}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Notifications;
