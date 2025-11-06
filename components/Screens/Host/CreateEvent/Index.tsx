import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../../../Settings/tailwind";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../../../../Settings/ThemeContext";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapView, { Marker, Region } from "react-native-maps";

interface IPropsCreateEvent {
  navigation: any;
}

const CreateEvent = ({ navigation }: IPropsCreateEvent) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentValue, setPaymentValue] = useState(null);
  const [paymentItems, setPaymentItems] = useState([
    { label: "USSD", value: "ussd" },
    { label: "Bank Transfer", value: "bank transfer" },
    { label: "Credit Card", value: "credit card" },
  ]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectDate, setSelectDate] = useState("");
  const [isDeadlineDatePickerVisible, setIsDeadlineDatePickerVisible] =
    useState(false);
  const [selectDeadlineDate, setSelectDeadlineDate] = useState("");
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);
  const showDeadlineDatePicker = () => setIsDeadlineDatePickerVisible(true);
  const hideDeadlineDatePicker = () => setIsDeadlineDatePickerVisible(false);
  const showStartPicker = () => setStartPickerVisible(true);
  const hideStartPicker = () => setStartPickerVisible(false);
  const showEndPicker = () => setEndPickerVisible(true);
  const hideEndPicker = () => setEndPickerVisible(false);

  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleConfirm = (date: any) => {
    setSelectDate(date.toDateString());
    hideDatePicker();
  };
  const handleDeadlineConfirm = (date: any) => {
    setSelectDeadlineDate(date.toDateString());
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

  return (
    <View style={[tw`flex-1 pt-15 pb-5 flex-1 px-5`, {}]}>
      <View style={[tw`gap-8 flex-1`]}>
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
            Create Event
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[tw`flex-1 mb-20`]}
        >
          <View style={[tw`gap-8`]}>
            <View style={[tw`gap-3`]}>
              <TouchableOpacity
                style={[
                  tw`border border-2 border-dashed rounded-md border-gray-400 h-50 items-center justify-center`,
                  {
                    backgroundColor: "#D3D3D3",
                  },
                ]}
              >
                <FontAwesome6
                  name="plus"
                  size={24}
                  color={colors.buttonBackground}
                />
                <Text style={[tw`text-gray-500`]}>Add Cover Photo</Text>
              </TouchableOpacity>
              <View style={[tw`flex-row gap-3`, {}]}>
                <TouchableOpacity
                  style={[
                    tw`border border-2 border-dashed rounded-md border-gray-400 flex-1 h-20 items-center justify-center`,
                    {
                      backgroundColor: "#D3D3D3",
                    },
                  ]}
                >
                  <FontAwesome6
                    name="plus"
                    size={24}
                    color={colors.buttonBackground}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    tw`border border-2 border-dashed rounded-md border-gray-400 flex-1 h-20 items-center justify-center`,
                    {
                      backgroundColor: "#D3D3D3",
                    },
                  ]}
                >
                  <FontAwesome6
                    name="plus"
                    size={24}
                    color={colors.buttonBackground}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    tw`border border-2 border-dashed rounded-md border-gray-400 flex-1 h-20 items-center justify-center`,
                    {
                      backgroundColor: "#D3D3D3",
                    },
                  ]}
                >
                  <FontAwesome6
                    name="plus"
                    size={24}
                    color={colors.buttonBackground}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    tw`border border-2 border-dashed rounded-md border-gray-400 flex-1 h-20 items-center justify-center`,
                    {
                      backgroundColor: "#D3D3D3",
                    },
                  ]}
                >
                  <FontAwesome6
                    name="plus"
                    size={24}
                    color={colors.buttonBackground}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                tw`border-b border-b-gray-400`,
                {
                  borderBottomWidth: 0.5,
                },
              ]}
            ></View>
            <View
              style={[
                tw`gap-3 border-b pb-7 border-b-gray-400`,
                {
                  borderBottomWidth: 0.5,
                },
              ]}
            >
              <Text style={[tw`text-xl font-semibold`]}>Event Details</Text>
              <View style={[tw`gap-4`]}>
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Event Name</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <TextInput
                    style={[tw`p-4 border rounded-md border-gray-400`]}
                    placeholder="Event Name"
                  />
                </View>
                <View style={[tw`gap-2`]}>
                  <Text>Select Event</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode="SCROLLVIEW"
                    placeholder="Select Event"
                    // Tailwind + custom styles
                    style={[
                      tw`border rounded-md px-4 py-3`,
                      {
                        borderColor: "#9ca3af", // Tailwind gray-400
                        backgroundColor: "#f9fafb", // Tailwind gray-50
                      },
                    ]}
                    textStyle={{
                      fontSize: 16,
                      color: "#374151", // Tailwind gray-700
                    }}
                    placeholderStyle={{
                      color: "#9ca3af", // Tailwind gray-400
                      fontSize: 16,
                    }}
                    dropDownContainerStyle={{
                      borderColor: "#9ca3af",
                      backgroundColor: "#ffffff",
                      borderRadius: 8,
                      elevation: 4, // shadow on Android
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}
                    arrowIconStyle={{}}
                    labelStyle={{
                      color: "#374151", // Tailwind gray-700
                      fontSize: 16,
                    }}
                  />
                </View>
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Select Date</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      tw`p-3 border rounded-md flex-row justify-between items-center border-gray-400`,
                    ]}
                    onPress={() => {
                      showDatePicker();
                    }}
                  >
                    <Text style={{ color: "#374151" }}>
                      {selectDate || "Select Date"}
                    </Text>
                    <FontAwesome6 name="calendar" size={22} color={"#333"} />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
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
                        tw`p-4 border flex-row items-center justify-between flex-1 rounded-md border-gray-400 bg-gray-50`,
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

                  {/* {startTime && endTime && (
                    <Text style={[tw`mt-2 text-gray-600`]}>
                      {`${formatTime(startTime)} - ${formatTime(endTime)}`}
                    </Text>
                  )} */}
                  <DateTimePickerModal
                    isVisible={isStartPickerVisible}
                    mode="time"
                    onConfirm={handleConfirmStart}
                    onCancel={hideStartPicker}
                  />

                  {/* End Time Picker */}
                  <DateTimePickerModal
                    isVisible={isEndPickerVisible}
                    mode="time"
                    onConfirm={handleConfirmEnd}
                    onCancel={hideEndPicker}
                  />
                </View>
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Add location</Text>
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
                    />
                    <Entypo style={[tw``]} name="location-pin" size={22} />
                  </View>
                </View>
                <View style={[tw`gap-2`]}>
                  <View style={[tw`flex-row`]}>
                    <Text>Add Location Details</Text>
                    <Text style={[tw`text-red-400`]}>*</Text>
                  </View>
                  <TextInput
                    style={[tw`p-4 border rounded-md border-gray-400`]}
                    placeholder="Add Location Details"
                  />
                </View>
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
                  />
                </View>
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
            <View style={[tw`gap-4`]}>
              <Text style={[tw`text-xl font-semibold`, {}]}>
                Tickets and Payments
              </Text>
              <View style={[tw`gap-2`]}>
                <View style={[tw`flex-row`]}>
                  <Text>Ticket Price for VIP</Text>
                  <Text style={[tw`text-red-400`]}>*</Text>
                </View>
                <View
                  style={[
                    tw`p-4 flex-row gap-2 border rounded-md items-center border-gray-400`,
                  ]}
                >
                  <FontAwesome6 name="naira-sign" size={14} color={"#aaa"} />
                  <TextInput style={[tw`w-full`]} placeholder="0.00" />
                </View>
              </View>
              <View style={[tw`gap-2`]}>
                <View style={[tw`flex-row`]}>
                  <Text>Ticket Price for Economy</Text>
                  <Text style={[tw`text-red-400`]}>*</Text>
                </View>
                <View
                  style={[
                    tw`p-4 flex-row gap-2 border rounded-md items-center border-gray-400`,
                  ]}
                >
                  <FontAwesome6 name="naira-sign" size={14} color={"#aaa"} />
                  <TextInput style={[tw`w-full`]} placeholder="0.00" />
                </View>
              </View>
              <View style={[tw`gap-2`]}>
                <View style={[tw`flex-row`]}>
                  <Text>Choose a Ticket Purchase Deadline</Text>
                  <Text style={[tw`text-red-400`]}>*</Text>
                </View>
                <TouchableOpacity
                  style={[
                    tw`p-3 border rounded-md flex-row justify-between items-center border-gray-400`,
                  ]}
                  onPress={() => {
                    showDeadlineDatePicker();
                  }}
                >
                  <Text style={{ color: "#374151" }}>
                    {selectDeadlineDate || "Select Deadline"}
                  </Text>
                  <FontAwesome6 name="calendar" size={22} color={"#333"} />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDeadlineDatePickerVisible}
                  mode="date"
                  onConfirm={handleDeadlineConfirm}
                  onCancel={hideDeadlineDatePicker}
                />
              </View>
              <DropDownPicker
                open={openPayment}
                value={paymentValue}
                items={paymentItems}
                setOpen={setOpenPayment}
                setValue={setPaymentValue}
                setItems={setPaymentItems}
                listMode="SCROLLVIEW"
                placeholder="Choose Payout Method"
                // Tailwind + custom styles
                style={[
                  tw`border rounded-md px-4 py-3`,
                  {
                    borderColor: "#9ca3af", // Tailwind gray-400
                    backgroundColor: "#f9fafb", // Tailwind gray-50
                  },
                ]}
                textStyle={{
                  color: "#374151", // Tailwind gray-700
                }}
                placeholderStyle={{
                  color: "#9ca3af", // Tailwind gray-400
                }}
                dropDownContainerStyle={{
                  borderColor: "#9ca3af",
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  elevation: 4, // shadow on Android
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                }}
                arrowIconStyle={{}}
                labelStyle={{
                  color: "#374151", // Tailwind gray-700
                }}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("/Authentication/Attendee/ExploreEvents");
          }}
          style={[
            tw`py-4 mb-4 absolute rounded-full w-full bottom-0 items-center`,
            {
              backgroundColor: colors.buttonBackground,
            },
          ]}
        >
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateEvent;
