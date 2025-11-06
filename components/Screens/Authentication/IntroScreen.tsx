import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";

interface IPropsIntroduction {
  navigation: any;
}

const IntroScreen = ({ navigation }: IPropsIntroduction) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        tw`py-10 px-5`,
        {
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={{
          gap: 10,
        }}
      >
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
              tw``,
              {
                color: "white",
              },
            ]}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={[
            tw`py-4 items-center rounded-full`,
            {
              backgroundColor: colors.buttonBackground,
            },
          ]}
        >
          <Text
            style={[
              tw``,
              {
                color: "white",
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;
