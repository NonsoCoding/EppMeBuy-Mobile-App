import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "../../../Settings/tailwind";
import { useTheme } from "../../../Settings/ThemeContext";
import ResetPasswordModal from "../../Modals/ResetPasswordModal";
import * as Yup from "yup";
import { Formik } from "formik";
import LoadingScreen from "../../Modals/LoadingScreen";

interface IPropsResetPassword {
  navigation: any;
  route: any;
}

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword = ({ navigation, route }: IPropsResetPassword) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const { otp, email, phoneNumber } = route.params || {};

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleResetPassword = async (values: any) => {
    console.log("ForgottenPassword:", otp);
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          newPassword: values.newPassword,
          email,
          phoneNumber,
        }),
      });

      console.log("Response status: ", res.status);
      const text = await res.text();
      const data = JSON.parse(text);
      console.log("Server response: ", data);

      if (data.success) {
        setLoading(false);
        Alert.alert("Success", "Password reset successful!");
        navigation.navigate("Tabs");
      } else {
        setLoading(false);
        Alert.alert("Error", data.message || "Password reset failed");
      }
    } catch (error) {
      setLoading(false);
      console.log("Forgotten password error: ", error);
      Alert.alert("Error", "omething went wrong.Please check your connection.");
    }
  };

  return (
    <>
      <LoadingScreen message="" visible={loading} />
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
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
              tw`flex-1 py-15 px-5 justify-between`,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <View style={[tw`justify-between flex-1`]}>
              <View style={[tw`gap-7`]}>
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
                    Reset Password
                  </Text>
                </View>
                <View style={[tw`gap-5`]}>
                  {/* <Text
                  style={[
                    tw`text-white font-semibold text-xl`,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  Create a new password
                </Text> */}
                  <View
                    style={[
                      tw`p-10 self-center rounded-full`,
                      {
                        backgroundColor: colors.lighterBg,
                      },
                    ]}
                  >
                    <AntDesign
                      name="lock"
                      size={60}
                      color={colors.buttonBackground}
                    />
                  </View>
                  <View style={tw`gap-2`}>
                    <Text
                      style={[
                        tw`text-sm font-medium ml-1`,
                        { color: colors.text, opacity: 0.7 },
                      ]}
                    >
                      New Password
                    </Text>
                    <View
                      style={[
                        tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                        {
                          borderColor:
                            focusedField === "newPassword"
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
                        value={values.newPassword}
                        style={[
                          tw`flex-1 py-4.5`,
                          {
                            fontSize: 15,
                          },
                        ]}
                        onChangeText={handleChange("newPassword")}
                        secureTextEntry={!showNewPassword}
                        onFocus={() => setFocusedField("newPassword")}
                        onBlur={() => setFocusedField(null)}
                      />
                      <TouchableOpacity
                        onPress={() => setShowNewPassword(!showNewPassword)}
                      >
                        <Ionicons
                          name={showNewPassword ? "eye-off" : "eye"}
                          size={18}
                          color={colors.text}
                          style={{ opacity: 0.7 }}
                        />
                      </TouchableOpacity>
                    </View>

                    {touched.newPassword && errors.newPassword && (
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
                          {errors.newPassword}
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
                      Confirm Password
                    </Text>
                    <View
                      style={[
                        tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                        {
                          borderColor:
                            focusedField === "confirmPassword"
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
                        value={values.confirmPassword}
                        style={[
                          tw`flex-1 py-4.5`,
                          {
                            fontSize: 15,
                          },
                        ]}
                        onChangeText={handleChange("confirmPassword")}
                        secureTextEntry={!showConfirmPassword}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField(null)}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Ionicons
                          name={showConfirmPassword ? "eye-off" : "eye"}
                          size={18}
                          color={colors.text}
                          style={{ opacity: 0.7 }}
                        />
                      </TouchableOpacity>
                    </View>

                    {touched.confirmPassword && errors.confirmPassword && (
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
                          {errors.confirmPassword}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
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
                    Save
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <ResetPasswordModal
                text1="Congrats!"
                text2="Your password has been updated"
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

export default ResetPassword;
