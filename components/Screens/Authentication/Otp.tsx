import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";
import LoadingScreen from "../../Modals/LoadingScreen";

interface OtpProps {
  navigation: any;
  route: any;
}

const Otp = ({ navigation, route }: OtpProps) => {
  const [otpToken, setOtpToken] = useState("");
  const { colors } = useTheme();
  const { values, otp } = route.params;
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    console.log("Passed data: ", values, otp);
    if (otpToken.trim().length === 0) {
      Alert.alert("Error", "Please enter the OTP code sent to your email.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (otpToken === otp) {
        setLoading(false);
        navigation.navigate("ResetPasswordScreen", {
          otp: otp,
          email: values,
          phoneNumber: values,
        });
      } else {
        setLoading(false);
        Alert.alert(
          "Invalid Code",
          "The OTP you entered is incorrect. Please try again."
        );
      }
    }, 2000);
  };

  return (
    <>
      <LoadingScreen message="Loading" visible={loading} />
      <View
        style={[
          tw`flex-1 py-15 px-5 justify-between`,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={[tw`justify-between flex-1`]}>
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
          <View style={[tw`gap-5 items-center`]}>
            <View style={[tw`flex-row`]}>
              <Text
                style={[
                  tw``,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Code has been sent to
              </Text>
              <Text style={[tw`font-semibold`]}> {values.email}</Text>
            </View>
            <OtpInput
              numberOfDigits={6}
              onTextChange={(code) => setOtpToken(code)}
              focusColor={colors.buttonBackground}
              autoFocus
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`gap-3`,
                pinCodeContainerStyle: {
                  borderColor: colors.buttonBackground,
                  borderWidth: 2,
                  borderRadius: 12,
                  width: 50,
                  backgroundColor: colors.lighterBackground,
                },
                pinCodeTextStyle: { color: colors.text, fontSize: 20 },
              }}
            />
            <View style={[tw`flex-row gap-1`]}>
              <Text
                style={[
                  tw`font-semibold`,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Resend code in
              </Text>
              <View style={[tw`flex-row`]}>
                <Text
                  style={[
                    tw`font-semibold`,
                    {
                      color: colors.buttonBackground,
                    },
                  ]}
                >
                  56
                </Text>
                <Text
                  style={[
                    tw``,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  s
                </Text>
              </View>
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
              <Text style={tw`text-white font-semibold text-base`}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Otp;
