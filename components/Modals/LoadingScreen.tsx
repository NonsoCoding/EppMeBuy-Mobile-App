import { Modal, Text, View } from "react-native";
import tw from "../../Settings/tailwind";
import LottieView from "lottie-react-native";
import { useTheme } from "../../Settings/ThemeContext";

interface IPropsLoadingScreen {
  visible: boolean;
  message: string;
}

const LoadingScreen = ({ visible, message }: IPropsLoadingScreen) => {
  const { colors } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={[
          tw`items-center flex-1 justify-center`,
          {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        ]}
      >
        <View>
          <LottieView
            style={[tw`h-22 w-22`]}
            autoPlay={true}
            source={require("../../assets/images/Loading.json")}
            loop={true}
            resizeMode="contain"
          />
          {/* <Text
            style={[
              tw`text-center text-sm bottom-3`,
              {
                color: colors.text,
              },
            ]}
          >
            {message}
          </Text> */}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingScreen;
