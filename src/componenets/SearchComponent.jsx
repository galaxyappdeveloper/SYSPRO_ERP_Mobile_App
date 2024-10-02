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

const SearchComponent = ({ toggleSearchBar }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
        />

        <TouchableOpacity onPress={toggleSearchBar}>
          <Image
            source={Icon.closeIcon}
            style={styles.closeIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    height: hp(7),
    width: wp(100),
    // flex: 1,
    padding: hp(1),
    // position:"relative",
    // top:0,
    zIndex: 1,
  },
  closeIcon: {
    width: hp(4),
    height: hp(4),
    tintColor: themePrimaryColor,
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
    borderRadius: 10,
    padding: hp(1),
    backgroundColor: "white",
  },
});
