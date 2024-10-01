import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomBtn from "../../componenets/CustomBtn";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { Icon } from "../../constants/Icon";

const FilterModal = ({ toggle }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(false);
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(false);
    setToDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Filter Header */}
      <View style={styles.header}>
        <Text className="font-gsemibold" style={styles.headerText}>
          Filter
        </Text>
        <TouchableOpacity onPress={() => toggle()}>
          <Text className="font-gsemibold" style={styles.resetText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* Select Filter Option */}
      <TouchableOpacity style={styles.inputContainer}>
        <Image
          source={Icon.companyIcon}
          style={styles.icon}
          contentFit="contain"
        />
        <Text style={styles.inputText}>Select</Text>

        <Image
          source={Icon.dropDownIcon}
          style={styles.icon}
          contentFit="contain"
        />
      </TouchableOpacity>

      {/* From Date Picker */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowFromDatePicker(true)}
      >
        <Image
          source={Icon.yearIcon}
          style={styles.icon}
          contentFit="contain"
        />
        <Text style={styles.inputText}>From Date</Text>
        <Image
          source={Icon.dropDownIcon}
          style={styles.icon}
          contentFit="contain"
        />
      </TouchableOpacity>
      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={onFromDateChange}
        />
      )}

      {/* To Date Picker */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowToDatePicker(true)}
      >
        <Image
          source={Icon.yearIcon}
          style={styles.icon}
          contentFit="contain"
        />
        <Text style={styles.inputText}>To Date</Text>
        <Image
          source={Icon.dropDownIcon}
          style={styles.icon}
          contentFit="contain"
        />
      </TouchableOpacity>
      {showToDatePicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={onToDateChange}
        />
      )}
      <View style={styles.buttonContainer}>
        <CustomBtn title="Apply" Customstyle={{ height: hp(8) }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: hp(4),
    height: hp(55),
    backgroundColor: "#FAFAFA",
    // borderRadius: 20
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(6),
  },
  headerText: {
    fontSize: hp(2.5),
    color: "#021121",
  },
  resetText: {
    fontSize: hp(2),
    color: "#FF4141",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: hp(2.5),
    margin: hp(1.5),
    top: hp(-3.5),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
    height: hp(3),
    width: hp(3),
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: "#C0C0C0",
  },
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 26,
    alignItems: "center",
    marginTop: hp(-2),
    // paddingHorizontal: hp(2),
    // borderWidth: 1,
  },
});

export default FilterModal;
