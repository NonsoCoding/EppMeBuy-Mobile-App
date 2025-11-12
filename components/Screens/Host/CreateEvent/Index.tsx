import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import tw from "../../../../Settings/tailwind";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../../../../Settings/ThemeContext";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapView, { Marker, Region } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IPropsCreateEvent {
  navigation: any;
}

const CreateEvent = ({ navigation }: IPropsCreateEvent) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Image states
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  // Form states
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [vipPrice, setVipPrice] = useState("");
  const [economyPrice, setEconomyPrice] = useState("");

  // Category dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Music", value: "MUSIC" },
    { label: "Sports", value: "SPORTS" },
    { label: "Arts", value: "ARTS" },
    { label: "Technology", value: "TECHNOLOGY" },
    { label: "Business", value: "BUSINESS" },
    { label: "Food & Drink", value: "FOOD_DRINK" },
    { label: "Education", value: "EDUCATION" },
    { label: "Health", value: "HEALTH" },
  ]);

  // Payment dropdown
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentValue, setPaymentValue] = useState(null);
  const [paymentItems, setPaymentItems] = useState([
    { label: "USSD", value: "ussd" },
    { label: "Bank Transfer", value: "bank_transfer" },
    { label: "Credit Card", value: "credit_card" },
  ]);

  // Date pickers
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [isDeadlineDatePickerVisible, setIsDeadlineDatePickerVisible] =
    useState(false);
  const [selectDeadlineDate, setSelectDeadlineDate] = useState<Date | null>(
    null
  );
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Map state
  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Date picker handlers
  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);
  const showDeadlineDatePicker = () => setIsDeadlineDatePickerVisible(true);
  const hideDeadlineDatePicker = () => setIsDeadlineDatePickerVisible(false);
  const showStartPicker = () => setStartPickerVisible(true);
  const hideStartPicker = () => setStartPickerVisible(false);
  const showEndPicker = () => setEndPickerVisible(true);
  const hideEndPicker = () => setEndPickerVisible(false);

  const handleConfirm = (date: Date) => {
    setSelectDate(date);
    hideDatePicker();
  };

  const handleDeadlineConfirm = (date: Date) => {
    setSelectDeadlineDate(date);
    hideDeadlineDatePicker();
  };

  const handleConfirmStart = (time: Date) => {
    setStartTime(time);
    hideStartPicker();
  };

  const handleConfirmEnd = (time: Date) => {
    setEndTime(time);
    hideEndPicker();
  };

  // Format time (e.g. 12:00 PM)
  const formatTime = (time: Date | null) => {
    if (!time) return "";
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toDateString();
  };

  const pickImage = async (index?: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Permission to access gallery is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;

      if (index === undefined) {
        setCoverImage(uri);
      } else {
        const newImages = [...images];
        newImages[index] = uri;
        setImages(newImages);
      }
    }
  };

  // Validate form
  const validateForm = () => {
    if (!coverImage) {
      Alert.alert("Validation Error", "Please add a cover photo");
      return false;
    }
    if (!eventName.trim()) {
      Alert.alert("Validation Error", "Please enter event name");
      return false;
    }
    if (!value) {
      Alert.alert("Validation Error", "Please select event category");
      return false;
    }
    if (!selectDate) {
      Alert.alert("Validation Error", "Please select event date");
      return false;
    }
    if (!startTime || !endTime) {
      Alert.alert("Validation Error", "Please select start and end time");
      return false;
    }
    if (!venueName.trim()) {
      Alert.alert("Validation Error", "Please enter venue name");
      return false;
    }
    if (!venueAddress.trim()) {
      Alert.alert("Validation Error", "Please enter venue address");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Validation Error", "Please enter event description");
      return false;
    }
    return true;
  };

  // Combine date and time
  const combineDateAndTime = (date: Date, time: Date) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined.toISOString();
  };

  // Create event API call
  const handleCreateEvent = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Get access token
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("AccessToken: ", accessToken);

      if (!accessToken) {
        Alert.alert("Error", "Please login to create an event");
        navigation.navigate("/Login");
        return;
      }

      // Create FormData
      const formData = new FormData();

      // Add cover image
      if (coverImage) {
        const filename = coverImage.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("coverImages", {
          uri: coverImage,
          name: filename || "cover.jpg",
          type: type,
        } as any);
      }

      // Add additional images
      images.forEach((img, index) => {
        if (img) {
          const filename = img.split("/").pop();
          const match = /\.(\w+)$/.exec(filename || "");
          const type = match ? `image/${match[1]}` : "image/jpeg";

          formData.append("coverImages", {
            uri: img,
            name: filename || `image-${index}.jpg`,
            type: type,
          } as any);
        }
      });

      // Combine date and time for start and end
      const startDateTime = combineDateAndTime(selectDate!, startTime!);
      const endDateTime = combineDateAndTime(selectDate!, endTime!);

      // Add form fields as strings (FormData will handle them)
      formData.append("title", eventName);
      formData.append("description", description);
      formData.append("category", value || "");
      formData.append("startDateTime", startDateTime);
      formData.append("endDateTime", endDateTime);
      formData.append("timezone", "UTC");
      formData.append("venueName", venueName);
      formData.append("venueAddress", venueAddress);
      formData.append("country", totalCapacity || "Nigeria");
      formData.append("accessType", "PUBLIC");

      // BOOLEAN - MUST be JSON.stringify()
      formData.append("isOnline", JSON.stringify(false));
      // or JSON.stringify(isOnlineState) if you have a toggle

      // NUMBERS - MUST be JSON.stringify(Number())
      if (vipPrice && vipPrice.trim() !== "") {
        formData.append("vipFee", JSON.stringify(Number(vipPrice)));
      }

      if (economyPrice && economyPrice.trim() !== "") {
        formData.append("economyFee", JSON.stringify(Number(economyPrice)));
      }

      // Add status
      formData.append("status", "PUBLISHED");

      console.log("Sending FormData to API...");
      console.log({
        isOnline: JSON.stringify(false),
        vipFee: JSON.stringify(Number(vipPrice)),
        economyFee: JSON.stringify(Number(economyPrice)),
      });

      // Make API call
      const response = await fetch(`${apiUrl}/api/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Don't set Content-Type - FormData will set it automatically with boundary
        },
        body: formData,
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok && result.success) {
        Alert.alert("Success", "Event created successfully!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ExploreEventsScreen"),
          },
        ]);
      } else {
        // Show detailed error message
        const errorMessage =
          result.message || result.error || "Failed to create event";
        console.error("API Error:", result);
        Alert.alert("Error", errorMessage);
      }
    } catch (error: any) {
      console.error("Error creating event:", error);
      Alert.alert(
        "Error",
        error.message || "An error occurred while creating the event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[tw`flex-1 pt-15 pb-5 flex-1 px-5`]}>
      <View style={[tw`gap-8 flex-1`]}>
        <View style={[tw`flex flex-row items-center gap-3`]}>
          <TouchableOpacity
            style={[
              tw`p-3 rounded-full`,
              {
                backgroundColor: colors.lighterBg,
              },
            ]}
            onPress={() => navigation.goBack()}
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
            Create Event
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[tw`flex-1 mb-20`]}
        >
          <View style={[tw`gap-8`]}>
            {/* Image Upload Section */}
            <View style={[tw`gap-3`]}>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={[
                  tw`border border-2 border-dashed rounded-md border-gray-400 h-50 items-center justify-center`,
                  {
                    backgroundColor: "#D3D3D3",
                  },
                ]}
              >
                {coverImage ? (
                  <Image
                    source={{ uri: coverImage }}
                    style={[
                      tw`rounded-md`,
                      {
                        width: "100%",
                        height: "100%",
                      },
                    ]}
                  />
                ) : (
                  <Text style={[tw`text-gray-500`]}>Add Cover Photo</Text>
                )}
              </TouchableOpacity>
              <View style={[tw`flex-row gap-3`]}>
                {images.map((img, index) => (
                  <TouchableOpacity
                    onPress={() => pickImage(index)}
                    key={index}
                    style={[
                      tw`border border-2 border-dashed rounded-md border-gray-400 flex-1 h-20 items-center justify-center`,
                      {
                        backgroundColor: "#D3D3D3",
                      },
                    ]}
                  >
                    {img ? (
                      <Image
                        source={{ uri: img }}
                        style={[
                          tw`rounded-md`,
                          {
                            width: "100%",
                            height: "100%",
                          },
                        ]}
                      />
                    ) : (
                      <FontAwesome6
                        name="plus"
                        size={24}
                        color={colors.buttonBackground}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View
              style={[
                tw`border-b border-b-gray-400`,
                { borderBottomWidth: 0.5 },
              ]}
            />

            {/* Event Details Section */}
            <View
              style={[
                tw`gap-3 border-b pb-7 border-b-gray-400`,
                { borderBottomWidth: 0.5 },
              ]}
            >
              <Text style={[tw`text-xl font-semibold`]}>Event Details</Text>
              <View style={[tw`gap-4`]}>
                {/* Event Name */}
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Event Name</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <TextInput
                    style={[tw`p-4 border rounded-md border-gray-400`]}
                    placeholder="Event Name"
                    value={eventName}
                    onChangeText={setEventName}
                  />
                </View>

                {/* Select Category */}
                <View style={[tw`gap-2`]}>
                  <Text>Select Category</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode="SCROLLVIEW"
                    placeholder="Select Category"
                    style={[
                      tw`border rounded-md px-4 py-3`,
                      {
                        borderColor: "#9ca3af",
                        backgroundColor: "#f9fafb",
                      },
                    ]}
                    textStyle={{
                      fontSize: 16,
                      color: "#374151",
                    }}
                    placeholderStyle={{
                      color: "#9ca3af",
                      fontSize: 16,
                    }}
                    dropDownContainerStyle={{
                      borderColor: "#9ca3af",
                      backgroundColor: "#ffffff",
                      borderRadius: 8,
                      elevation: 4,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}
                  />
                </View>

                {/* Select Date */}
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Select Date</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      tw`p-3 border rounded-md flex-row justify-between items-center border-gray-400`,
                    ]}
                    onPress={showDatePicker}
                  >
                    <Text style={{ color: "#374151" }}>
                      {formatDate(selectDate) || "Select Date"}
                    </Text>
                    <FontAwesome6 name="calendar" size={22} color={"#333"} />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={new Date()}
                  />
                </View>

                {/* Select Hours */}
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Select Hours</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <View
                    style={[tw`flex-row gap-4 items-center justify-center`]}
                  >
                    <TouchableOpacity
                      onPress={showStartPicker}
                      style={[
                        tw`p-3 flex-row items-center justify-between border rounded-md flex-1 border-gray-400 bg-gray-50`,
                      ]}
                    >
                      <Text style={[tw`text-gray-700`]}>
                        {startTime
                          ? `Start: ${formatTime(startTime)}`
                          : "Select Start Time"}
                      </Text>
                      <FontAwesome6 name="clock" size={20} color={"#D7D7D7"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={showEndPicker}
                      style={[
                        tw`p-3 border flex-row items-center justify-between flex-1 rounded-md border-gray-400 bg-gray-50`,
                      ]}
                    >
                      <Text style={[tw`text-gray-700`]}>
                        {endTime
                          ? `End: ${formatTime(endTime)}`
                          : "Select End Time"}
                      </Text>
                      <FontAwesome6 name="clock" size={20} color={"#D7D7D7"} />
                    </TouchableOpacity>
                  </View>
                  <DateTimePickerModal
                    isVisible={isStartPickerVisible}
                    mode="time"
                    onConfirm={handleConfirmStart}
                    onCancel={hideStartPicker}
                  />
                  <DateTimePickerModal
                    isVisible={isEndPickerVisible}
                    mode="time"
                    onConfirm={handleConfirmEnd}
                    onCancel={hideEndPicker}
                  />
                </View>

                {/* Venue Name */}
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Venue Name</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <TextInput
                    style={[tw`p-4 border rounded-md border-gray-400`]}
                    placeholder="Venue Name"
                    value={venueName}
                    onChangeText={setVenueName}
                  />
                </View>

                {/* Venue Address */}
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Venue Address</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <View
                    style={[
                      tw`p-3 flex-row w-full pr-7 items-center justify-between border rounded-md border-gray-400`,
                    ]}
                  >
                    <TextInput
                      style={[tw`w-full`]}
                      placeholder="Add Location"
                      value={venueAddress}
                      onChangeText={setVenueAddress}
                    />
                    <Entypo name="location-pin" size={22} />
                  </View>
                </View>

                {/* Country */}
                <View style={[tw`gap-2`]}>
                  <Text>Total Capacity</Text>
                  <TextInput
                    style={[tw`p-4 border rounded-md border-gray-400`]}
                    placeholder="Country"
                    value={totalCapacity}
                    onChangeText={setTotalCapacity}
                  />
                </View>

                {/* About Event */}
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>About Event</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <TextInput
                    multiline
                    textAlignVertical="top"
                    numberOfLines={5}
                    style={[tw`p-4 border rounded-md border-gray-400 h-45`]}
                    placeholder="About Event"
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>

                {/* Map */}
                <View style={[tw`gap-3`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Add Location on Maps</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <MapView
                    style={tw`w-full h-60 rounded-lg`}
                    region={region}
                    onRegionChangeComplete={setRegion}
                  >
                    <Marker coordinate={region}>
                      <View
                        style={[
                          tw`w-12 h-12 rounded-full border-2 items-center justify-center`,
                          { borderColor: "#4B6BFB", backgroundColor: "#fff" },
                        ]}
                      >
                        <Image
                          source={{
                            uri: "https://randomuser.me/api/portraits/men/1.jpg",
                          }}
                          style={tw`w-10 h-10 rounded-full`}
                        />
                      </View>
                    </Marker>
                  </MapView>
                </View>
              </View>
            </View>

            {/* Tickets and Payments */}
            <View style={[tw`gap-4`]}>
              <Text style={[tw`text-xl font-semibold`]}>
                Tickets and Payments
              </Text>

              {/* VIP Price */}
              <View style={[tw`gap-2`]}>
                <Text>Ticket Price for VIP</Text>
                <View
                  style={[
                    tw`p-4 flex-row gap-2 border rounded-md items-center border-gray-400`,
                  ]}
                >
                  <FontAwesome6 name="naira-sign" size={14} color={"#aaa"} />
                  <TextInput
                    style={[tw`w-full`]}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={vipPrice}
                    onChangeText={setVipPrice}
                  />
                </View>
              </View>

              {/* Economy Price */}
              <View style={[tw`gap-2`]}>
                <Text>Ticket Price for Economy</Text>
                <View
                  style={[
                    tw`p-4 flex-row gap-2 border rounded-md items-center border-gray-400`,
                  ]}
                >
                  <FontAwesome6 name="naira-sign" size={14} color={"#aaa"} />
                  <TextInput
                    style={[tw`w-full`]}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={economyPrice}
                    onChangeText={setEconomyPrice}
                  />
                </View>
              </View>

              {/* Deadline */}
              <View style={[tw`gap-2`]}>
                <Text>Choose a Ticket Purchase Deadline</Text>
                <TouchableOpacity
                  style={[
                    tw`p-3 border rounded-md flex-row justify-between items-center border-gray-400`,
                  ]}
                  onPress={showDeadlineDatePicker}
                >
                  <Text style={{ color: "#374151" }}>
                    {formatDate(selectDeadlineDate) || "Select Deadline"}
                  </Text>
                  <FontAwesome6 name="calendar" size={22} color={"#333"} />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDeadlineDatePickerVisible}
                  mode="date"
                  onConfirm={handleDeadlineConfirm}
                  onCancel={hideDeadlineDatePicker}
                  minimumDate={new Date()}
                />
              </View>

              {/* Payment Method */}
              <DropDownPicker
                open={openPayment}
                value={paymentValue}
                items={paymentItems}
                setOpen={setOpenPayment}
                setValue={setPaymentValue}
                setItems={setPaymentItems}
                listMode="SCROLLVIEW"
                placeholder="Choose Payout Method"
                style={[
                  tw`border rounded-md px-4 py-3`,
                  {
                    borderColor: "#9ca3af",
                    backgroundColor: "#f9fafb",
                  },
                ]}
                textStyle={{
                  color: "#374151",
                }}
                placeholderStyle={{
                  color: "#9ca3af",
                }}
                dropDownContainerStyle={{
                  borderColor: "#9ca3af",
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                }}
              />
            </View>
          </View>
        </ScrollView>

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreateEvent}
          disabled={loading}
          style={[
            tw`py-4 mb-4 absolute rounded-full w-full bottom-0 items-center`,
            {
              backgroundColor: loading ? "#ccc" : colors.buttonBackground,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text
              style={[
                tw`font-semibold`,
                {
                  color: colors.buttonText,
                },
              ]}
            >
              Create New Event & Publish
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateEvent;
