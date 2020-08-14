import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import axios from "axios";
import globalStyle from "../globalStyle";
import MapView from "react-native-maps";
import RoomItem from "../components/RoomItem";

const RoomScreen = ({ route }) => {
  // On récupère les props
  // console.log(navigation, "\n ----------- ");
  // console.log(route, "\n ----------- ");
  const { params } = route;
  const itemId = params.itemId;
  //   console.log(itemId);

  // States
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/${itemId}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [itemId]);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="#F35960"
      style={globalStyle.justAlignCenter}
    ></ActivityIndicator>
  ) : (
    <ScrollView style={[globalStyle.bgWhite, globalStyle.flex1]}>
      <RoomItem data={data} details={true} swipeImages={true} />
      <TouchableWithoutFeedback onPress={() => setViewMore(!viewMore)}>
        <Text
          style={[
            globalStyle.baseText,
            globalStyle.safeZoneHorizontal,
            globalStyle.mB20,
          ]}
          numberOfLines={viewMore ? null : 4}
        >
          {data.description}
        </Text>
      </TouchableWithoutFeedback>
      <View style={[globalStyle.flex1, globalStyle.safeZoneHorizontal]}>
        <MapView
          // La MapView doit obligatoirement avoir des dimensions
          style={{ width: "100%", height: 170 }}
          initialRegion={{
            latitude: data.loc[1],
            longitude: data.loc[0],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={false}
        >
          <MapView.Marker
            coordinate={{ latitude: data.loc[1], longitude: data.loc[0] }}
            title={data.title}
          >
            <Image
              source={require("../assets/marker.png")}
              style={{ height: 35, width: 35 }}
            />
          </MapView.Marker>
        </MapView>
      </View>
    </ScrollView>
  );
};

export default RoomScreen;
