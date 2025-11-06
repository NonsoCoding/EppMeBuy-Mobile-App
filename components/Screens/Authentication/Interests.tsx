import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../Settings/ThemeContext";
import mockData from "../../../assets/data/mockData.json";
import tw from "../../../Settings/tailwind";

interface IPropsInterestScreen {
  navigation: any;
}

interface Interest {
  id: string;
  name: string;
  icon: any;
}

const InterestScreen = ({
  navigation
}: IPropsInterestScreen) => {
    const { colors } = useTheme();

    const Interests: Interest[] = mockData.party_interests.map((interest) => ({
        id: interest.id,
        name: interest.label,
        icon: require("../../../assets/images/Logo.png"),
  }))

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Header */}
              <View style={styles.header}>
          <TouchableOpacity onPress={() => {
                    navigation.back();
                  }}>
          <FontAwesome6  
            color={colors.buttonBackground}
            size={30}
            name="arrow-left-long"
          />
                  </TouchableOpacity>
          <Text
            style={[
              tw`text-xl`,
              {
                color: colors.text,
              },
            ]}
          >
            Select Your Interest
          </Text>
        </View>

              {/* Grid Layout */}
        <ScrollView style={[tw`mb-13`]}
          contentContainerStyle={{
            gap: 20
          }}
        >
        <View style={styles.grid}>
          {Interests.map((item) => {
            const isSelected = selectedInterests.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleSelection(item.id)}
                activeOpacity={0.8}
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected
                      ? colors.buttonBackground
                      : colors.lighterBackground,
                    borderWidth: 1,
                    borderColor: colors.buttonBackground,
                  },
                ]}
              >
                <Image
                  style={[
                    styles.icon,
                    {
                      tintColor: isSelected
                        ? colors.lighterBackground
                        : colors.buttonBackground,
                    },
                  ]}
                  source={item.icon}
                />
                <Text
                  style={[tw`items-center text-center`, [
                    styles.cardText,
                    {
                      color: isSelected
                        ? colors.lighterBackground
                        : colors.buttonBackground,
                    },
                  ]]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
         <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.navigate("/Authentication/ChooseLocation")
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
                          Save
                        </Text>
                      </LinearGradient>
                </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  content: {
    gap: 24,
  },
  header: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    width: "47%",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  icon: {
    height: 80,
    width: 80,
    resizeMode: "contain",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default InterestScreen;