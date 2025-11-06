import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import * as Yup from "yup";
import tw from "../../../Settings/tailwind";
import { useTheme } from "../../../Settings/ThemeContext";

interface IPropsLogin {
  navigation: any;
  route: any;
  phoneNumber?: string;
}

const signUpSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const PhoneNumber = ({ navigation, route }: IPropsLogin) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { colors } = useTheme();
  const { email, password } = route.params;

  return (
    <Formik
      initialValues={{
        phoneNumber: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={(values) => {
        navigation.navigate("PersonalInfo", { email, password, ...values });
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
            tw`flex-1 px-6 py-15`,
            {
              backgroundColor: colors.background,
              justifyContent: "center",
            },
          ]}
        >
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
                phone
              </Text>
              <View
                style={[
                  tw`px-3 rounded-xl text-base flex-row items-center justify-between`,
                  {
                    borderColor:
                      focusedField === "phoneNumber"
                        ? colors.buttonBackground
                        : colors.buttonBackground + "30",
                    borderWidth: 2,
                    backgroundColor: colors.lighterBackground,
                    shadowColor:
                      focusedField === "phoneNumber"
                        ? colors.buttonBackground
                        : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: focusedField === "phoneNumber" ? 0.15 : 0.05,
                    shadowRadius: 8,
                    elevation: focusedField === "phoneNumber" ? 4 : 1,
                  },
                ]}
              >
                <TextInput
                  placeholder="+234 9163440787"
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
                shadowColor: colors.buttonBackground,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 5,
              },
            ]}
          >
            <Text style={tw`text-white text-base font-semibold`}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default PhoneNumber;
