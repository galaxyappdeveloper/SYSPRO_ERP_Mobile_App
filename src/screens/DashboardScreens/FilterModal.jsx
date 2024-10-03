import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
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
import { Dropdown } from "react-native-element-dropdown";

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
  const [selectedType, setSelectedType] = useState("Select Type");

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
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: "blue" }]}>Type *</Text>
    );
  };
  return (
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

      <View style={styles.container}>
        <View style={styles.inputContainers}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.containerStyle}
            itemContainerStyle={styles.itemContainerStyle}
            renderLeftIcon={() => (
              <Image source={Icon.companyIcon} style={styles.companyIcon} />
            )}
            renderRightIcon={() => (
              <Image
                source={Icon.dropDownIcon}
                style={[
                  styles.dropDownIcon,
                  { transform: [{ rotate: isFocus ? "180deg" : "0deg" }] },
                ]}
              />
            )}
            data={dropdownOptions}
            maxHeight={300}
            labelField="TranOrigin"
            valueField="TranOrigin"
            placeholder={!isFocus ? "Select Type" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              handleDropdownChange(item.TranOrigin);
            }}
          />

          {/* From Date Selector */}

          <View style={styles.FromdatePickerConatiner}>
            <Text style={styles.labelOne}>From Date *</Text>

            <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
              <View style={styles.Fromdate}>
                <Text style={styles.dateText}>
                  {"  "}
                  {fromDate.toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={Icon.yearIcon}
                  style={styles.yearIcon}
                  contentFit="contain"
                />
              </View>
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

          <View style={styles.TodatePickerConatiner}>
            <Text style={styles.labelOne}>To Date *</Text>

            <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
              <View style={styles.Todate}>
                <Text style={styles.dateText}>
                  {"  "}
                  {toDate.toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={Icon.yearIcon}
                  style={styles.yearIcon}
                  contentFit="contain"
                />
              </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: hp(5),
    zIndex: 1,
  },
  headerText: {
    left: wp(4),
    fontSize: hp(2.5),
    color: "#021121",
  },
  resetText: {
    right: wp(4),
    fontSize: hp(2),
    color: "#FF4141",
  },
  container: {
    padding: hp(2),
    width: wp(100),
    height: hp(55),
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputContainers: {
    marginTop: hp(6),
    gap: hp(3),
  },
  dropdown: {
    width: wp(90),
    height: hp(8.5),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7EAF3",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: hp(2),
    paddingRight: hp(2),
    backgroundColor: "white",
    elevation: 5,
  },
  placeholderStyle: {
    marginLeft: hp(1),
    borderLeftWidth: 1,
    borderLeftColor: "#E7EAF3",
    paddingLeft: hp(1.5),
    height: hp(3),
  },
  selectedTextStyle: {
    marginLeft: hp(1),
    borderLeftWidth: 1,
    borderLeftColor: "#E7EAF3",
    paddingLeft: hp(1.5),
    height: hp(4),
  },
  iconStyle: {
    width: hp(6),
    height: hp(6),
  },
  containerStyle: {
    zIndex: 1000,
    maxHeight: hp(25),
    width: wp(90),
    borderRadius: 20,
    borderColor: "#E7EAF3",
    backgroundColor: "white",
  },
  itemContainerStyle: {
    flex: 1,
    height: hp(7),
    borderBottomWidth: 0.5,
    borderBottomColor: "#78819D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
  companyIcon: {
    width: hp(3),
    height: hp(3),
  },
  dropDownIcon: {
    width: hp(3),
    height: hp(3),
  },
  FromdatePickerConatiner: {
    borderWidth: 1,
    width: wp(90),
    height: hp(8.5),
    borderColor: "#E7EAF3",
    borderRadius: 16,
    paddingHorizontal: hp(1),
    padding: hp(1),
    backgroundColor: "white",
    alignSelf: "center",
    elevation: 5,
  },
  labelOne: {
    position: "absolute",
    paddingHorizontal: wp(1.9),
    bottom: hp(7.5),
    zIndex: 999,
    left: wp(6),
    backgroundColor: "white",
    color: "#5C658C",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  Fromdate: {
    flexDirection: "row",
    marginLeft: hp(6),
    marginTop: hp(2),
  },
  dateText: {
    fontSize: 16,
    color: "#000",
    alignSelf: "center",
  },
  imageContainer: {
    height: hp(4),
    width: hp(5),
    alignItems: "center",
    justifyContent: "center",
    bottom: hp(3),
    borderColor: "#E7EAF3",
    borderRightWidth: 1,
  },
  yearIcon: {
    width: hp(3),
    height: hp(3),
  },
  TodatePickerConatiner: {
    borderWidth: 1,
    width: wp(90),
    height: hp(8.5),
    borderColor: "#E7EAF3",
    borderRadius: 16,
    padding: hp(1),
    backgroundColor: "white",
    alignSelf: "center",
    elevation: 5,
  },
  Todate: {
    flexDirection: "row",
    marginLeft: hp(6),
    marginTop: hp(2),
  },
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 26,
    alignItems: "center",
    top: hp(2),
    paddingVertical: hp(1.5),
    padding: hp(2.5),
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: hp(3.5),
    top: hp(-1),
    zIndex: 999,
    backgroundColor: "white",
    color: "#5C658C",
    paddingHorizontal: wp(1.9),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default FilterModal;
