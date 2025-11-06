import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import * as Yup from "yup";
import tw from "../../../Settings/tailwind";
import { useTheme } from "../../../Settings/ThemeContext";
import LoadingScreen from "../../Modals/LoadingScreen";

interface IPropsLogin {
  navigation: any;
  route: any;
}

const signUpSchema = Yup.object().shape({
  email: Yup.string().required().email(),
});

const EmailResetLink = ({ navigation, route }: IPropsLogin) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleEmailVerification = async (values: any) => {
    setLoading(true);
    console.log("Email values: ", values);

    try {
      const res = await fetch(
        "https://server.myport.com.ng/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const text = await res.text();
      const data = JSON.parse(text);
      console.log("forgottenPassowrd data: ", data);
      setTimeout(() => {
        setLoading(false);
        if (res.ok && data.success) {
          navigation.navigate("Otp", { values: values.email, otp: data.otp });
          Alert.alert(
            "Success",
            "Email verification code has been sent to your email"
          );
        } else {
          Alert.alert(
            "Failed",
            "Failed to send verification code to your email"
          );
        }
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  };

  return (
    <>
      <LoadingScreen message="Loading..." visible={loading} />
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleEmailVerification}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View
            style={[
              tw`flex-1 px-6 py-15`,
              {
                backgroundColor: colors.background,
                justifyContent: "center",
              },
            ]}
          >
            <TouchableOpacity
              style={[
                tw`p-3 self-start rounded-full`,
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
            <View style={tw`gap-3 flex-1`}>
              <View style={tw`items-center`}>
                <Image
                  resizeMode="contain"
                  style={[tw`h-32 w-32`, {}]}
                  source={require("../../../assets/images/Logo.png")}
                />
              </View>

              {/* Header Section */}
              <View style={tw`gap-2`}>
                <Text
                  style={[
                    tw`text-center text-2xl font-bold`,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  Add your email address
                </Text>
                <Text
                  style={[
                    tw`text-center text-base`,
                    {
                      color: colors.text,
                      opacity: 0.6,
                    },
                  ]}
                >
                  You will recieve an OTP via email to reset your password
                </Text>
              </View>

              <View style={tw`gap-2`}>
                <View style={[tw`flex-row`]}>
                  <Text
                    style={[
                      tw`text-sm font-medium ml-1`,
                      { color: colors.text, opacity: 0.7 },
                    ]}
                  >
                    email
                  </Text>
                  <Text style={[tw`text-red-500`]}>*</Text>
                </View>
                <View
                  style={[
                    tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                    {
                      borderColor:
                        focusedField === "email"
                          ? colors.buttonBackground
                          : colors.buttonBackground + "30",
                      borderWidth: 2,
                      backgroundColor: colors.lighterBackground,
                    },
                  ]}
                >
                  <TextInput
                    placeholder="eppmebuy@gmail.com"
                    placeholderTextColor={"#A0A0A0"}
                    style={[
                      tw`flex-1 py-4.5`,
                      {
                        fontSize: 15,
                      },
                    ]}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>

                {touched.email && errors.email && (
                  <View
                    style={[
                      tw`rounded-md px-5
                                     py-1.5 rounded-full flex flex-row items-center gap-2`,
                      { backgroundColor: "rgba(255, 0, 0, 0.1)" },
                    ]}
                  >
                    <MaterialIcons
                      name="error"
                      style={[tw`text-red-500`]}
                      size={14}
                    />
                    <Text style={tw`text-red-500 text-xs ml-1`}>
                      {errors.email}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              activeOpacity={0.8}
              style={[
                tw`py-4 rounded-xl items-center mt-2`,
                {
                  backgroundColor: colors.buttonBackground,
                },
              ]}
            >
              <Text style={tw`text-white text-base font-semibold`}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </>
  );
};

export default EmailResetLink;
