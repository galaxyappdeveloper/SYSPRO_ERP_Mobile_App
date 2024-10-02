import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomBtn from "../../componenets/CustomBtn";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { Icon } from "../../constants/Icon";
import { images } from "../../constants/images";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import {
  getDashboardSummary,
  getDashboardSummaryFilter,
} from "../../Actions/Dashboard/dashboardAction";
import { formatDate } from "../../functions/formatDate";
import {
  setStateFromDate,
  setStateToDate,
} from "../../redux/dashboardSlices/DashboardSlice";

const FilterModal = ({
  dropdownOptions,
  onSelectDropdown,
  onSelectFromDate,
  onSelectToDate,
  toggle,
  type,
}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleDropdownChange = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    setSelectedType(selectedOption);
  };

  console.log("From Date : ", formatDate(fromDate));
  console.log("TO Date : ", formatDate(toDate));

  const handleFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(false);
    setFromDate(currentDate);
    onSelectFromDate(currentDate);
    console.log("Selected From Date:", currentDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(false);
    setToDate(currentDate);
    onSelectToDate(currentDate);
    console.log("Selected to Date:", currentDate);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStateFromDate(formatDate(fromDate)));
    dispatch(setStateToDate(formatDate(toDate)));
  }, [fromDate, toDate]);

  const handleFilter = () => {
    dispatch(getDashboardSummaryFilter(fromDate, toDate, type, selectedType));
    toggle();
  };

  return (
    <View style={styles.container}>
      <View source={images.filterFrame} imageStyle={styles.image}>
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

        {/* Dropdown */}

        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedType}
            onValueChange={handleDropdownChange}
            style={styles.dropdown}
            placeholder="Select Type"
            mode="dropdown"
          >
            {dropdownOptions?.map((option, index) => (
              <Picker.Item
                key={index}
                label={option?.TranOrigin}
                value={option?.TranOrigin}
              />
            ))}
          </Picker>
        </View>

        {/* From Date Selector */}

        <View style={styles.datePickerConatiner}>
          <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
            <Text style={styles.dateText}>
              From Date: {fromDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showFromDatePicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={handleFromDateChange}
            />
          )}
        </View>

        {/* To Date Selector */}

        <View style={styles.datePickerConatiner}>
          <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
            <Text style={styles.dateText}>
              To Date: {toDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showToDatePicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={handleToDateChange}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomBtn
            onPressHandler={() => handleFilter()}
            title="Apply"
            Customstyle={{ height: hp(8) }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: hp(2),
    width: wp(100),
    height: hp(55),

    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(8),
  },
  headerText: {
    left: wp(4),
    top: hp(3),
    fontSize: hp(2.5),
    color: "#021121",
  },
  resetText: {
    right: wp(4),
    top: hp(3),
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
    paddingVertical: hp(1.5),
    padding: hp(2.5),
    // paddingHorizontal: hp(2),
    // borderWidth: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 10,
  },
  datePickerConatiner: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 12,
    borderRadius: 12,
  },
});

export default FilterModal;
