import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import mockData from "../../../assets/data/mockData.json";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../../Modals/LoadingScreen";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

interface IPropsLogin {
  navigation?: any;
  route: any;
}

const loginScheme = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid address")
    .required("Email is a required field"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, route }: IPropsLogin) => {
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Create the redirect URI that your backend should use
      const redirectUri = "myapp://auth/callback";

      // Pass the redirect URI to your backend
      const authUrl = `${apiUrl}/api/auth/google?redirectUri=${encodeURIComponent(
        redirectUri
      )}`;

      console.log("Opening auth URL:", authUrl);

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      console.log("Auth session result:", result);

      if (result.type === "success" && result.url) {
        // Handle the callback URL
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

  const handleLogin = async (values: any) => {
    console.log("Login data: ", values);
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status: ", res.status);
      const text = await res.text();
      console.log("Raw response Text", text);
      const data = JSON.parse(text);
      console.log("Server response:", data);
      if (res.ok && data.success) {
        await AsyncStorage.setItem("accessToken:", data.accessToken);
        await AsyncStorage.setItem("refreshToken:", data.refreshToken);
        Alert.alert("Success", "Login successfull welcome to your dashboard.");
        navigation.replace("Tabs");
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("Failed", "invalid credentials.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error", error);
    }
  };

  return (
    <>
      <LoadingScreen message="Signing in..." visible={loading} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginScheme}
        onSubmit={handleLogin}
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
              { backgroundColor: colors.background, justifyContent: "center" },
            ]}
          >
            <View style={tw`gap-1`}>
              <View style={[tw`pb-4`]}>
                <View style={tw`items-center`}>
                  <Image
                    source={require("../../../assets/images/Logo.png")}
                    style={[tw`h-32 w-32 w-full`, { resizeMode: "contain" }]}
                  />
                </View>

                {/* Welcome text */}
                <View style={tw`gap-1`}>
                  <Text
                    style={[
                      tw`text-center text-3xl font-bold`,
                      { color: colors.text },
                    ]}
                  >
                    Welcome Back
                  </Text>
                  <Text
                    style={[
                      tw`text-center text-base text-sm`,
                      { color: colors.text, opacity: 0.6 },
                    ]}
                  >
                    Sign in to continue exploring parties and events
                  </Text>
                </View>
              </View>
              {/* Logo */}

              {/* Input Fields */}
              <View style={tw`gap-2`}>
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
                      keyboardType="email-address"
                      value={values.email}
                      style={[
                        tw`flex-1 py-4.5`,
                        {
                          fontSize: 15,
                        },
                      ]}
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

                {/* Forgot Password */}
                <TouchableOpacity
                  style={tw`self-end -mt-1`}
                  onPress={() => {
                    navigation.navigate("ForgottenPassword");
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      tw`text-sm font-semibold`,
                      { color: colors.buttonBackground },
                    ]}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign in Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleSubmit();
                }}
                style={[tw`rounded-xl overflow-hidden mt-2`]}
              >
                <LinearGradient
                  colors={[colors.buttonBackground, "#6B4EFF"]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={tw`py-4 items-center`}
                >
                  <Text style={tw`text-white font-semibold text-base`}>
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={tw`flex-row items-center justify-center gap-3 mt-2`}>
                <View
                  style={[
                    tw`h-[1px] flex-1`,
                    { backgroundColor: colors.text, opacity: 0.2 },
                  ]}
                />
                <Text
                  style={[tw`text-sm`, { color: colors.text, opacity: 0.5 }]}
                >
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
                    handleGoogleLogin();
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

              {/* Sign Up Link */}
              <View style={tw`flex-row justify-center items-center gap-1 mt-2`}>
                <Text
                  style={[tw`text-sm`, { color: colors.text, opacity: 0.7 }]}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace("SignUpScreen")}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      tw`text-sm font-bold`,
                      { color: colors.buttonBackground },
                    ]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

export default Login;
