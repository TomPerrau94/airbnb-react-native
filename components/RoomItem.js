import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import globalStyle from "../globalStyle";
import { FontAwesome } from "@expo/vector-icons";

const RoomItem = ({ data, details, swipeImages }) => {
  // console.log(navigation, "\n ----------- ");
  // console.log(route);
  // Handle room rating stars color
  const roomRating = (rate, total) => {
    const roundedRate = Math.round(rate);
    let stars = [];

    for (let i = 0; i < total; i++) {
      let yellowStar = (
        <FontAwesome
          name="star"
          size={20}
          color="#F5B304"
          style={globalStyle.mR10}
          key={i}
        />
      );
      let greyStar = (
        <FontAwesome
          name="star"
          size={20}
          color="#BBBBBB"
          style={globalStyle.mR10}
          key={i}
        />
      );

      if (i < roundedRate) {
        stars.push(yellowStar);
      } else {
        stars.push(greyStar);
      }
    }
    return stars;
  };

  return (
    <View
      style={details ? null : [globalStyle.roomItemBorder, globalStyle.mB20]}
    >
      <View>
        {swipeImages ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={globalStyle.relative}
          >
            {data.photos.length > 0 ? (
              data.photos.map((photo, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    style={
                      details
                        ? globalStyle.roomDetailsImage
                        : globalStyle.roomItemCover
                    }
                  />
                );
              })
            ) : (
              <View style={globalStyle.roomNoImage}>
                <Text>Pas de photos :(</Text>
              </View>
            )}
          </ScrollView>
        ) : data.photos.length > 0 ? (
          <Image
            source={{ uri: data.photos[0] }}
            style={globalStyle.roomItemCover}
          />
        ) : (
          <View style={globalStyle.roomNoImage}>
            <Text>Pas de photos :(</Text>
          </View>
        )}
        <View style={globalStyle.roomItemPrice}>
          <Text style={globalStyle.roomItemPriceText}>{data.price} €</Text>
        </View>
      </View>
      <View
        style={
          details
            ? [globalStyle.roomItemInfos, globalStyle.safeZoneHorizontal]
            : globalStyle.roomItemInfos
        }
      >
        <View style={[globalStyle.roomItemLeft, globalStyle.mR30]}>
          <Text
            numberOfLines={details ? 2 : 1}
            style={[globalStyle.baseText, globalStyle.mB10]}
          >
            {data.title}
          </Text>
          <View style={globalStyle.roomItemRating}>
            <View style={globalStyle.flexRow}>
              {roomRating(data.ratingValue, 5)}
            </View>
            <Text
              style={[
                globalStyle.textGrey,
                globalStyle.baseText,
                globalStyle.mL10,
              ]}
            >
              {data.reviews} avis
            </Text>
          </View>
        </View>
        {data.user.account.photos.length < 2 ? (
          <Image
            source={{ uri: data.user.account.photos[0] }}
            style={globalStyle.roomItemOwnerPicture}
          />
        ) : (
          <Image
            source={{ uri: data.user.account.photos[1] }}
            style={globalStyle.roomItemOwnerPicture}
          />
        )}
      </View>
    </View>
  );
};

export default RoomItem;
