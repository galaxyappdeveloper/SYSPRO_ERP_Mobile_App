import React, { memo } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";

const PDFViwer = ({ link }) => {
  const source = {
    uri: link,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        enablePaging={true}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default memo(PDFViwer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
