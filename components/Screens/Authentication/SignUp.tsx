import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IPropsLogin {
  navigation: any;
  email?: string;
  password?: string;
}

const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid address")
    .required("Email is a required field."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is a required field."),
});

WebBrowser.maybeCompleteAuthSession();

const SignUp = ({ navigation, email, password }: IPropsLogin) => {
  const [checked, setChecked] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleGoogleCreate = async () => {
    try {
      setLoading(true);

      const redirectUri = "myapp://auth/callback";
      const authUri = `${apiUrl}/api/auth/google?redirectUri=${encodeURIComponent(
        redirectUri
      )}`;

      console.log("Opening auth URL: ", authUri);

      const result = await WebBrowser.openAuthSessionAsync(
        authUri,
        redirectUri
      );

      console.log("Auth session result: ", result);

      if (result.type === "success" && result.url) {
        const urlObj = new URL(result.url);
        const accessToken = urlObj.searchParams.get("accessToken");
        const refreshToken = urlObj.searchParams.get("refreshToken");

        if (accessToken && refreshToken) {
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);

          setLoading(false);
          Alert.alert("Success", "Google login successful!");
          navigation.replace("Tabs");
        } else {
          setLoading(false);
          Alert.alert("Error", "Failed to retrieve tokens");
        }
      } else if (result.type === "cancel") {
        setLoading(false);
        Alert.alert("Login cancelled");
      }
    } catch (error) {
      setLoading(false);
      console.error("Google login error:", error);
      Alert.alert("Error", "Failed to login with Google");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={(values) => {
        navigation.navigate("PhoneNumberScreen", values);
      }}
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
            tw`flex-1 px-6`,
            {
              backgroundColor: colors.background,
              justifyContent: "center",
            },
          ]}
        >
          <View style={tw`gap-1`}>
            <View style={tw`items-center`}>
              <Image
                resizeMode="contain"
                style={[tw`h-32 w-32`, {}]}
                source={require("../../../assets/images/Logo.png")}
              />
            </View>

            {/* Header Section */}
            <View style={tw`gap-2 pb-5`}>
              <Text
                style={[
                  tw`text-center text-3xl font-bold`,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Create Account
              </Text>
              <Text
                style={[
                  tw`text-center text-base text-sm`,
                  {
                    color: colors.text,
                    opacity: 0.6,
                  },
                ]}
              >
                Join us and start your journey today
              </Text>
            </View>

            <View style={tw`gap-2`}>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  { color: colors.text, opacity: 0.7 },
                ]}
              >
                Email
              </Text>
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
            <View style={tw`gap-2`}>
              <Text
                style={[
                  tw`text-sm font-medium ml-1`,
                  { color: colors.text, opacity: 0.7 },
                ]}
              >
                Password
              </Text>
              <View
                style={[
                  tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                  {
                    borderColor:
                      focusedField === "password"
                        ? colors.buttonBackground
                        : colors.buttonBackground + "30",
                    borderWidth: 2,
                    backgroundColor: colors.lighterBackground,
                  },
                ]}
              >
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor={"#A0A0A0"}
                  value={values.password}
                  style={[
                    tw`flex-1 py-4.5`,
                    {
                      fontSize: 15,
                    },
                  ]}
                  onChangeText={handleChange("password")}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color={colors.text}
                    style={{ opacity: 0.7 }}
                  />
                </TouchableOpacity>
              </View>

              {touched.password && errors.password && (
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
                    {errors.password}
                  </Text>
                </View>
              )}
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
                  shadowColor: colors.buttonBackground,
                },
              ]}
            >
              <Text style={tw`text-white text-base font-semibold`}>
                Continue
              </Text>
            </TouchableOpacity>

            <View style={tw`flex-row items-center justify-center gap-3 mt-2`}>
              <View
                style={[
                  tw`h-[1px] flex-1`,
                  { backgroundColor: colors.text, opacity: 0.2 },
                ]}
              />
              <Text style={[tw`text-sm`, { color: colors.text, opacity: 0.5 }]}>
                or
              </Text>
              <View
                style={[
                  tw`h-[1px] flex-1`,
                  { backgroundColor: colors.text, opacity: 0.2 },
                ]}
              />
            </View>

            <View
              style={[
                tw`flex flex-row justify-between items-center py-4 gap-4`,
              ]}
            >
              <TouchableOpacity
                style={[
                  tw` border gap-2 flex-row items-center justify-center border-gray-200 rounded-xl px-4 py-3 flex-1`,
                ]}
              >
                <Image
                  style={[tw`h-8 w-8`]}
                  source={require("../../../assets/images/facebook.png")}
                />
                <Text style={[tw`text-center font-semibold`]}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleGoogleCreate();
                }}
                style={[
                  tw` border gap-2 flex-row items-center justify-center border-gray-200 rounded-xl px-4 py-3 flex-1`,
                ]}
              >
                <Image
                  style={[tw`h-8 w-8`]}
                  source={require("../../../assets/images/google.png")}
                />
                <Text style={[tw`text-center font-semibold`]}>Google</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View
              style={tw`flex flex-row gap-1 items-center justify-center mt-4`}
            >
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.text,
                    opacity: 0.7,
                  },
                ]}
              >
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace("Login");
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    tw`font-bold text-sm`,
                    {
                      color: colors.buttonBackground,
                    },
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
