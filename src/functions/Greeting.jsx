import { Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export const Greeting = ({ customtextStyle }) => {
  const userdata = useSelector((state) => state.auth.userData);
  function capitalizeFirstLetter(str) {
    return str?.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  const myDate = new Date();
  const hours = myDate.getHours();
  let greet;

  if (hours < 12) {
    greet = "Morning ☕";
  } else if (hours >= 12 && hours <= 17) {
    greet = "Afternoon 👋🏻";
  } else {
    greet = "Evening ⛅";
  }

  return (
    <Text style={customtextStyle}>
      Good {greet}, {capitalizeFirstLetter(userdata?.CompanyName)}
    </Text>
  );
};
