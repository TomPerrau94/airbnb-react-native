import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import RoomItem from "../components/RoomItem";
import globalStyle from "../globalStyle";

export default function HomeScreen({ navigation, route }) {
  // console.log(navigation, "\n ----------- ");
  // console.log(route);
  // States
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Get data from server
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );

      // console.log(response.data);
      setData(response.data.rooms);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={globalStyle.flex1}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#F35960"
          style={globalStyle.flex1}
        ></ActivityIndicator>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Room", { itemId: item._id });
              }}
            >
              <RoomItem
                data={item}
                navigation={navigation}
                route={route}
                details={false}
                swipeImages={false}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          style={[globalStyle.safeZone, globalStyle.bgWhite]}
        />
      )}
    </SafeAreaView>
  );
}
