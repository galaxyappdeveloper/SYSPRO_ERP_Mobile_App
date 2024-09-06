import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";

const Dashboard = () => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View className="top-[7%]">
      <FlatList
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={() => {
          return (
            <View className="m-2">
              <View>
                <Image
                  source={{
                    uri: "https://d2cbe6qj96hbor.cloudfront.net/puzzles/KK5QO0HGDYBTIHNP.jpg",
                  }}
                  className="w-96 h-56 rounded-xl"
                />
              </View>
            </View>
          );
        }}
      ></FlatList>

      <View className="flex justify-center items-center h- w-[100%] mt-4">
        <FlatList
          horizontal={true}
          data={[1, 2]}
          renderItem={() => {
            return (
              <View className="w-40 h-48 rounded-xl border-2 m-2">
                <Image
                  source={{
                    uri: "https://d2cbe6qj96hbor.cloudfront.net/puzzles/KK5QO0HGDYBTIHNP.jpg",
                  }}
                  className="w-40 h-48 rounded-xl "
                />
              </View>
            );
          }}
        ></FlatList>
      </View>
      <View className="flex justify-center items-center h- w-[100%] mt-4">
        <FlatList
          horizontal={true}
          data={[1, 2]}
          renderItem={() => {
            return (
              <View className="w-40 h-48 rounded-xl border-2 m-2">
                <Image
                  source={{
                    uri: "https://d2cbe6qj96hbor.cloudfront.net/puzzles/KK5QO0HGDYBTIHNP.jpg",
                  }}
                  className="w-40 h-48 rounded-xl "
                />
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default Dashboard;
