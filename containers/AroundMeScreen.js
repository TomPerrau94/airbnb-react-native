import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import globalStyle from "../globalStyle";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const AroundMeScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getLocation = async () => {
    // Get Location permission
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    // Get current position
    const location = await Location.getCurrentPositionAsync();
    setLocation(location);

    // Get data from server to display markers
    try {
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      style={globalStyle.flex1}
      color="#F35960"
      size="large"
    ></ActivityIndicator>
  ) : (
    <View>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <View style={globalStyle.widthHeight}>
          <MapView
            // La MapView doit obligatoirement avoir des dimensions
            style={globalStyle.flex1}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={true}
          >
            {data.map((marker, index) => {
              console.log(marker._id);
              return (
                <MapView.Marker
                  key={marker._id}
                  coordinate={{
                    latitude: marker.loc[1],
                    longitude: marker.loc[0],
                  }}
                >
                  <Image
                    source={require("../assets/marker.png")}
                    style={{ height: 35, width: 35 }}
                  />
                  <MapView.Callout
                    onPress={() => {
                      navigation.navigate("Room", { itemId: marker._id });
                    }}
                    style={[globalStyle.flex1, { width: 200 }]}
                  >
                    <Text numberOfLines={1}>{marker.title}</Text>
                  </MapView.Callout>
                </MapView.Marker>
              );
            })}
          </MapView>
        </View>
      )}
    </View>
  );
};

export default AroundMeScreen;
