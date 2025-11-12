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
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const PhoneResetLink = ({ navigation, route }: IPropsLogin) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handlePhoneReset = async (values: any) => {
    setLoading(true);
    console.log("Phone Values: ", "+243", values);
    try {
      const res = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      const text = await res.text();
      const data = JSON.parse(text);
      console.log("Data values: ", data);

      setTimeout(() => {
        if (res.ok && data.success) {
          setLoading(false);
          Alert.alert(
            "Success",
            "Email verification code has been sent to your email"
          );
          navigation.navigate("Otp", {
            values: values.phoneNumber,
            otp: data.otp,
          });
        } else {
          setLoading(false);
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
      <LoadingScreen message="" visible={loading} />
      <Formik
        initialValues={{
          phoneNumber: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handlePhoneReset}
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
                  Add your phone number
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
                  Provide us with your phone number to recieve a reset password
                  OTP
                </Text>
              </View>

              <View style={tw`gap-2`}>
                <View
                  style={[
                    tw`px-3 rounded-xl gap-1.5 text-base flex-row items-center justify-between`,
                    {
                      borderColor:
                        focusedField === "phoneNumber"
                          ? colors.buttonBackground
                          : colors.buttonBackground + "30",
                      borderWidth: 2,
                      backgroundColor: colors.lighterBackground,
                    },
                  ]}
                >
                  <View
                    style={[
                      tw`flex-row items-center gap-1.5 border-r border-r-gray-400 pr-1.5`,
                    ]}
                  >
                    <Image
                      style={[tw`h-7 w-7`]}
                      source={require("../../../assets/images/flag.png")}
                    />
                    <Text style={[tw`text-gray-400`]}>+234</Text>
                  </View>
                  <TextInput
                    placeholder="9163440787"
                    placeholderTextColor={"#A0A0A0"}
                    style={[
                      tw`flex-1 py-4.5`,
                      {
                        fontSize: 15,
                      },
                    ]}
                    value={values.phoneNumber}
                    onChangeText={handleChange("phoneNumber")}
                    onFocus={() => setFocusedField("phoneNumber")}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>

                {touched.phoneNumber && errors.phoneNumber && (
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
                      {errors.phoneNumber}
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

export default PhoneResetLink;
