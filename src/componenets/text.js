import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icons } from "../constants/Icons";

const DropdownwithIcon = ({ rightIcon, label, renderData }) => {
  const [selectedItem, setSelectedItem] = useState("Select");
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.companyContainer}>
        <View>
          <Image
            resizeMode="contain"
            style={styles.buliding}
            source={rightIcon}
          />
        </View>
        <View style={styles.lableContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <TouchableOpacity
          style={styles.dropDownSelector}
          onPress={() => setIsClicked(!isClicked)}
        >
          <Text>{selectedItem}</Text>
          {isClicked ? (
            <Image source={Icons.dropDownIcon} style={styles.icon} />
          ) : (
            <Image source={Icons.dropDownIcon} style={styles.icon} />
          )}
        </TouchableOpacity>

        {isClicked ? (
          <View style={styles.dropDownArea}>
            <FlatList
              data={renderData}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.companyItem}
                    onPress={() => {
                      setSelectedItem(item);
                      setIsClicked(!isClicked);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DropdownwithIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
  },
  buliding: {
    width: wp(7),
    height: hp(5),
    top: hp(34),
    left: wp(10),
    position: "absolute",
    borderRightWidth: 5,
  },

  dropDownSelector: {
    borderWidth: 1,
    width: wp(90),
    height: hp(8),
    borderRadius: 16,
    alignSelf: "center",
    marginTop: hp(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: wp(17),
    paddingRight: wp(3),
    borderColor: "#E7EAF3",
  },
  lableContainer: {
    zIndex: 1,
    width: wp(18),
    top: hp(31.2),
    left: wp(12),
    backgroundColor: "white",
  },
  labelText: {
    fontSize: hp(1.8),
    fontWeight: "100",
    color: "5C658C",
    backgroundColor: "white",
    alignSelf: "center",
  },
  icon: {
    width: wp(5),
    height: hp(3),
  },
  dropDownArea: {
    height: hp(40),
    width: wp(90),
    borderRadius: 20,
    borderColor: "#E7EAF3",
    marginTop: hp(2),
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 5,
  },

  companyItem: {
    width: wp(80),
    height: hp(7),
    borderBottomWidth: 0.2,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
  companySecondContainer: {
    bottom: hp(14),
  },
});
