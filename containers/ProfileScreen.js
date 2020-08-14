import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import globalStyle from "../globalStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ userToken, userId, setToken }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle Image upload
  const handleImagePicked = useCallback(async (pickerResult) => {
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;

        // Pour isoler l'extension du fichier, afin de connaitre son type (jpg, png...)
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        // FormData() va nous servir à envoyer un fichier en body de la requête
        const formData = new FormData();

        // On ajoute à l'object formData une clé picture
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });

        // La requête pour envoyer l'image au serveur
        const uploadResponse = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/upload_picture/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (
          Array.isArray(uploadResponse.data.photo) === true &&
          uploadResponse.data.photo.length > 0
        ) {
          setImage(uploadResponse.data.photo[0].url);
        }
      }
    } catch (error) {
      alert("Upload failed, sorry :(");
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  });

  // Handle profile update
  const handleSubmit = async () => {
    console.log(data);
    if (
      description !== data.description ||
      username !== data.username ||
      image !== data.photo[0].url
    ) {
      try {
        const response = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/update/${userId}`,
          {
            username,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setData(response.data);
        alert("Votre profil a bien été mis à jour");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert(
        "Aucune modification apportée. Veuillez modifier le(s) champ(s) Username et/ou Description."
      );
    }
  };

  // Get data from server
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
      setUsername(response.data.username);
      setDescription(response.data.description);
      setImage(response.data.photo[0].url);
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
        <KeyboardAwareScrollView
          extraScrollHeight={170}
          style={globalStyle.bgWhite}
        >
          <View style={globalStyle.safeZone}>
            <View style={[globalStyle.alignCenter]}>
              {uploading ? (
                <ActivityIndicator
                  color="#F35960"
                  size="large"
                  style={globalStyle.flex1}
                ></ActivityIndicator>
              ) : image ? (
                <>
                  <Image
                    source={{ uri: image }}
                    style={globalStyle.userPicture}
                  />
                  <TouchableOpacity
                    onPress={async () => {
                      // Get permission
                      const galleryPerm = await ImagePicker.requestCameraPermissionsAsync();
                      // console.log(galleryPerm);

                      // If permission granted
                      if (galleryPerm.status === "granted") {
                        // Get image gallery
                        const pickerResult = await ImagePicker.launchImageLibraryAsync(
                          {
                            allowsEditing: true,
                            aspect: [4, 3],
                          }
                        );
                        handleImagePicked(pickerResult);
                      }
                    }}
                    style={globalStyle.editButton}
                  >
                    <Ionicons name="md-brush" size={18} color="white" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Image
                    source={require("../assets/user.png")}
                    style={[globalStyle.userNoPicture]}
                  />
                  <TouchableOpacity
                    onPress={async () => {
                      // Get permission
                      const galleryPerm = await ImagePicker.requestCameraPermissionsAsync();
                      // console.log(galleryPerm);

                      // If permission granted
                      if (galleryPerm.status === "granted") {
                        // Get image gallery
                        const pickerResult = await ImagePicker.launchImageLibraryAsync(
                          {
                            allowsEditing: true,
                            aspect: [4, 3],
                          }
                        );
                        handleImagePicked(pickerResult);
                      }
                    }}
                    style={globalStyle.editButton}
                  >
                    <Ionicons name="md-brush" size={18} color="white" />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TextInput
              value={data.name}
              style={[globalStyle.baseText, globalStyle.inputRed]}
              editable={false}
            />
            <TextInput
              value={data.email}
              style={[globalStyle.baseText, globalStyle.inputRed]}
              editable={false}
            />
            <TextInput
              placeholder="Username"
              autoCompleteType="username"
              textContentType="username"
              onChangeText={(text) => setUsername(text)}
              value={username}
              clearButtonMode={"while-editing"}
              style={[
                globalStyle.baseText,
                globalStyle.inputRed,
                globalStyle.mB10,
              ]}
            />
            <TextInput
              multiline={true}
              placeholder="Décrivez-vous en quelques mots..."
              numberOfLines={6}
              onChangeText={(text) => setDescription(text)}
              value={description}
              style={[
                globalStyle.baseText,
                globalStyle.inputRed,
                globalStyle.textArea,
                globalStyle.borderRedFull,
              ]}
            />
            <View style={[globalStyle.justAlignCenter, globalStyle.mT30]}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[
                  globalStyle.tertiaryButton,
                  globalStyle.justAlignCenter,
                  globalStyle.mB20,
                ]}
              >
                <Text style={globalStyle.tertiaryButtonText}>
                  Modifier le profil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setToken(null);
                }}
                style={[globalStyle.primaryButton, globalStyle.justAlignCenter]}
              >
                <Text style={[globalStyle.primaryButtonText]}>
                  Se déconnecter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
}
