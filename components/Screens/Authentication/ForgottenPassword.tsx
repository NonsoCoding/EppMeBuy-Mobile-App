import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";
import { useState } from "react";

interface IPropsForgottenPassword {
  navigation: any;
  email?: string;
}

const ForgottenPassword = ({ navigation, email }: IPropsForgottenPassword) => {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<"sms" | "email" | null>(null);

  const handleContinue = () => {
    if (selected === "sms") {
      navigation.navigate("ResetPhoneLinkScreen");
    } else if (selected === "email") {
      navigation.navigate("ResetEmailLinkScreen");
    }
  };

  return (
    <View
      style={[
        tw`flex-1 py-15 px-5 justify-between`,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={[tw`gap-10`]}>
        <View style={[tw`flex flex-row items-center gap-3`, {}]}>
          <TouchableOpacity
            style={[
              tw`p-3 rounded-full`,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome6
              name="arrow-left-long"
              size={17}
              color={colors.buttonBackground}
            />
          </TouchableOpacity>
          <Text
            style={[
              tw`text-xl font-semibold`,
              {
                color: colors.text,
              },
            ]}
          >
            Forgotten Password
          </Text>
        </View>
        <View style={[tw`gap-5`]}>
          <Text
            style={[
              tw``,
              {
                color: colors.text,
              },
            ]}
          >
            Select which contact details should we use to reset your password
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelected("sms");
            }}
            style={[
              tw`p-5 flex-row items-center gap-5 rounded-lg border`,
              {
                borderColor:
                  selected === "sms" ? colors.buttonBackground : "#D3D3D3",
              },
            ]}
          >
            <View
              style={[
                tw`p-3 rounded-full`,
                {
                  backgroundColor: "#5265FF1A",
                },
              ]}
            >
              <MaterialIcons
                name="message"
                size={30}
                color={colors.buttonBackground}
              />
            </View>
            <View style={[tw`gap-2`]}>
              <Text
                style={[
                  tw`text-[17px] font-semibold`,
                  {
                    color: colors.text,
                  },
                ]}
              >
                via SMS:
              </Text>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Reset your password via SMS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected("email");
            }}
            style={[
              tw`p-5 flex-row items-center gap-5 rounded-lg border`,
              {
                borderColor:
                  selected === "email" ? colors.buttonBackground : "#D3D3D3",
              },
            ]}
          >
            <View
              style={[
                tw`p-3 rounded-full`,
                {
                  backgroundColor: "#5265FF1A",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="email"
                color={colors.buttonBackground}
                size={30}
              />
            </View>
            <View style={[tw`gap-2`]}>
              <Text
                style={[
                  tw`text-[17px] font-semibold`,
                  {
                    color: colors.text,
                  },
                ]}
              >
                via Email:
              </Text>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Reset your password via Email
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handleContinue();
        }}
        style={[
          tw`rounded-xl overflow-hidden mt-2`,
          {
            shadowColor: colors.buttonBackground,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 5,
          },
        ]}
      >
        <LinearGradient
          colors={[colors.buttonBackground, "#6B4EFF"]}
          start={[0, 0]}
          end={[1, 1]}
          style={tw`py-4 items-center`}
        >
          <Text style={tw`text-white font-semibold text-base`}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ForgottenPassword;
