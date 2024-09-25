import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { Icon } from "../../constants/Icon";
import { themePrimaryColor } from "../../constants/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenName } from "../../constants/screenName";

const PdfReader = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        marginHorizontal: wp(2),
        marginVertical: hp(1),
      }}
    >
      <View
        style={{
          marginHorizontal: wp(2),
          justifyContent: "space-evenly",
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={() => navigation.navigate(ScreenName.summeryDetails)}
        >
          <Image
            source={Icon.arrowRound}
            style={styles.backIcon}
            contentFit="contain"
          />
        </TouchableOpacity>

        <Text className="font-gsemibold text-lg " style={styles.ClientName}>
          #463
        </Text>
        <TouchableOpacity>
          <View>
            <Image
              source={Icon.downloadIcon}
              style={styles.backIcon}
              contentFit="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Image
              source={Icon.shareIcon}
              style={styles.backIcon}
              contentFit="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PdfReader;

const styles = StyleSheet.create({
  ClientName: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: wp(2),
    marginLeft: wp(8),
    color: themePrimaryColor,
  },
  backIcon: {
    width: hp(2.5),
    height: hp(2.5),
    margin: wp(2),
    tintColor: themePrimaryColor,
  },
});
