import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "../constants/Icon";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { themePrimaryColor } from "../constants/constant";

const SearchComponent = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {searchVisible ? (
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={(text) => setSearchText(text)}
          />
        ) : (
          <Text style={styles.title}></Text>
        )}
        <TouchableOpacity onPress={toggleSearchBar}>
          {searchVisible ? (
            <Image
              source={Icon.closeIcon}
              style={styles.closeIcon}
              contentFit="contain"
            />
          ) : (
            <Image
              source={Icon.searchIcon}
              style={styles.searchIcon}
              contentFit="contain"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  searchIcon: {
    width: hp(2.5),
    height: hp(2.5),
    left: wp(20),
    margin: wp(2),
    top: hp(0),
    tintColor: themePrimaryColor,
  },
  closeIcon: {
    width: hp(3),
    height: hp(3),
    left: wp(20),
    margin: wp(2),
    top: hp(0),
  },
  container: {
    flex: 1,
    padding: hp(1),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: hp(1),
    marginLeft: wp(-62),
    marginRight: wp(-30),
    backgroundColor: "white",
  },
});
