import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTheme } from "../../../Settings/ThemeContext";
import tw from "../../../Settings/tailwind";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LoadingScreen from "../../Modals/LoadingScreen";

const detailsSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
});

const PersonalInfo = ({ navigation, route }: any) => {
  const { colors } = useTheme();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { email, password, phoneNumber } = route.params;
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleFinalSubmit = async (values: any) => {
    setLoading(true);
    const userData = {
      email,
      password,
      phoneNumber,
      ...values,
      role: values.role.toUpperCase(),
    };
    console.log("Final Sign-Up Data:", userData);

    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response status:", res.status);
      const text = await res.text();
      console.log("Raw Response Text:", text);
      const data = JSON.parse(text);
      console.log("Server Response:", data);
      setLoading(false);
      if (res.ok && data.success) {
        navigation.navigate("Tabs");
        Alert.alert("Success", "Login successfull welcome to your dashboard.");
      } else {
        Alert.alert("Failed", "Invalid credentials.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
    }
  };

  return (
    <>
      <LoadingScreen message="Loading..." visible={loading} />
      <Formik
        initialValues={{ firstName: "", lastName: "", role: "" }}
        validationSchema={detailsSchema}
        onSubmit={handleFinalSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={[tw`px-5 py-12 pt-15 justify-between flex-1 gap-10`]}>
            <View style={[tw`gap-10`]}>
              <View style={tw`items-center`}>
                <Image
                  source={require("../../../assets/images/Logo.png")}
                  style={[tw`h-32 w-32 w-full`, { resizeMode: "contain" }]}
                />
                <Text style={[tw`text-3xl font-semibold`]}>
                  Personal Information
                </Text>
              </View>
              <View style={[tw`gap-3`]}>
                <View style={tw`gap-2`}>
                  <Text
                    style={[
                      tw`text-sm font-medium ml-1`,
                      { color: colors.text, opacity: 0.7 },
                    ]}
                  >
                    firstName
                  </Text>
                  <View
                    style={[
                      tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                      {
                        borderColor:
                          focusedField === "firstName"
                            ? colors.buttonBackground
                            : colors.buttonBackground + "30",
                        borderWidth: 2,
                        backgroundColor: colors.lighterBackground,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="firstName"
                      placeholderTextColor={"#A0A0A0"}
                      style={[
                        tw`flex-1 py-4.5`,
                        {
                          fontSize: 15,
                        },
                      ]}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>

                  {touched.firstName && errors.firstName && (
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
                        {errors.firstName}
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
                    LastName
                  </Text>
                  <View
                    style={[
                      tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                      {
                        borderColor:
                          focusedField === "lastName"
                            ? colors.buttonBackground
                            : colors.buttonBackground + "30",
                        borderWidth: 2,
                        backgroundColor: colors.lighterBackground,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="LastName"
                      placeholderTextColor={"#A0A0A0"}
                      value={values.lastName}
                      style={[
                        tw`flex-1 py-4.5`,
                        {
                          fontSize: 15,
                        },
                      ]}
                      onChangeText={handleChange("lastName")}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>

                  {touched.lastName && errors.lastName && (
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
                        {errors.lastName}
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
                    Role
                  </Text>
                  <View
                    style={[
                      tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                      {
                        borderColor:
                          focusedField === "role"
                            ? colors.buttonBackground
                            : colors.buttonBackground + "30",
                        borderWidth: 2,
                        backgroundColor: colors.lighterBackground,
                        shadowColor:
                          focusedField === "role"
                            ? colors.buttonBackground
                            : "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: focusedField === "role" ? 0.15 : 0.05,
                        shadowRadius: 8,
                        elevation: focusedField === "role" ? 4 : 1,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="Enter role (e.g., Attendee)"
                      placeholderTextColor={"#A0A0A0"}
                      value={values.role}
                      onChangeText={handleChange("role")}
                      style={[
                        tw`flex-1 py-4.5`,
                        {
                          fontSize: 15,
                        },
                      ]}
                      onFocus={() => setFocusedField("role")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>

                  {touched.role && errors.role && (
                    <View
                      style={[
                        tw`rounded-md px-5 py-1.5 rounded-full flex flex-row items-center gap-2`,
                        { backgroundColor: "rgba(255, 0, 0, 0.1)" },
                      ]}
                    >
                      <MaterialIcons
                        name="error"
                        style={[tw`text-red-500`]}
                        size={14}
                      />
                      <Text style={tw`text-red-500 text-xs ml-1`}>
                        {errors.role}
                      </Text>
                    </View>
                  )}
                </View>
                {/* Sign Up Button */}
              </View>
            </View>
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
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 5,
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

export default PersonalInfo;
