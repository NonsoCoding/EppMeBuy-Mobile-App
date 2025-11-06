import { LinearGradient } from "expo-linear-gradient";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../Settings/ThemeContext";
import tw from "../../Settings/tailwind";

interface IPropsResetPasswordModal {
  navigation?: any;
  onClose: () => void;
  text1: string;
  text2: string;
  visible: boolean;
}

const ResetPasswordModal = ({
  navigation,
  onClose,
  text1,
  text2,
  visible,
}: IPropsResetPasswordModal) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View
        style={[
          tw`px-5 pt-15 pb-10 justify-between`,
          {
            backgroundColor: colors.background,
            flex: 1,
          },
        ]}
      >
        <View></View>
        <View style={[tw`gap-5`]}>
          <View style={[tw`items-center`]}>
            <Image
              resizeMode="contain"
              style={[tw`h-20 w-20`]}
              source={require("../../assets/images/Logo.png")}
            />
          </View>
          <View style={[tw`items-center gap-4`]}>
            <Text
              style={[
                tw`text-xl font-semibold`,
                {
                  color: colors.buttonBackground,
                },
              ]}
            >
              {text1}
            </Text>
            <Text
              style={[
                tw``,
                {
                  color: colors.text,
                },
              ]}
            >
              {text2}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.replace("/(tabs)/Attendee/HomePage");
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
              Go to Homepage
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;
