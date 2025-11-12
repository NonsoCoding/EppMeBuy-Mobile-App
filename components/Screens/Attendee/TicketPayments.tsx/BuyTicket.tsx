import { Text, TouchableOpacity, View } from "react-native";
import tw from "../../../../Settings/tailwind";
import { useTheme } from "../../../../Settings/ThemeContext";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";

interface IPropsBuyTickets {
  navigation: any;
}

const BuyTicket = ({ navigation }: IPropsBuyTickets) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        tw`py-15 px-5 flex-1`,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={[tw`flex-1 justify-between`]}>
        <View style={[tw`flex-1 gap-6`]}>
          <View style={[tw`flex-row justify-between`]}>
            <View style={[tw`flex-row items-center gap-5`]}>
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
              <Text style={[tw`text-xl font-semibold`]}>Buy Ticket</Text>
            </View>
            <TouchableOpacity
              style={[
                tw`h-9 w-9 rounded-lg items-center justify-center`,
                {
                  backgroundColor: colors.lighterBg,
                },
              ]}
            >
              <Feather
                name="more-vertical"
                size={20}
                color={colors.buttonBackground}
              />
            </TouchableOpacity>
          </View>
          <View style={[tw`gap-4`]}>
            <Text style={[tw`font-semibold`]}>Ticket Type</Text>
            <View style={[tw`flex-row gap-2`]}>
              <TouchableOpacity
                style={[
                  tw`border-2 py-2.5 items-center flex-1 rounded-full`,
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
                  VIP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`border-2 py-2.5 flex-1 items-center rounded-full`,
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
                  Economy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[tw`gap-4`]}>
            <Text style={[tw`font-semibold`]}>Seat</Text>
            <View
              style={[
                tw`flex-row items-center justify-between px-10 py-5 border border-gray-300 rounded-lg`,
              ]}
            >
              <TouchableOpacity
                style={[
                  tw`p-5 rounded-md`,
                  {
                    backgroundColor: colors.lighterBg,
                  },
                ]}
              >
                <AntDesign
                  name="minus"
                  size={20}
                  color={colors.buttonBackground}
                />
              </TouchableOpacity>
              <Text style={[tw`text-3xl`]}>1</Text>
              <TouchableOpacity
                style={[
                  tw`p-5 rounded-md`,
                  {
                    backgroundColor: colors.lighterBg,
                  },
                ]}
              >
                <AntDesign
                  name="plus"
                  size={20}
                  color={colors.buttonBackground}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[tw`gap-3`]}>
          <View style={[tw`flex-row items-center self-center`]}>
            <Text style={[tw`text-xl font-semibold`]}>Total: </Text>
            <FontAwesome6 name="naira-sign" size={20} color="black" />
            <Text style={[tw`text-xl font-semibold`]}>245</Text>
          </View>
          <TouchableOpacity
            style={[
              tw`py-4 items-center rounded-full`,
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
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BuyTicket;
