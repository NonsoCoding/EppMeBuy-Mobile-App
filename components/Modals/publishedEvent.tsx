import { View } from "react-native";
import tw from "../../Settings/tailwind";

interface IPropsPublishedEvent {
  navigation: any;
}

const Publishedevent = ({ navigation }: IPropsPublishedEvent) => {
  return (
    <View style={[tw`flex-1 py-15 px-5`]}>
      <View></View>
    </View>
  );
};

export default Publishedevent;
