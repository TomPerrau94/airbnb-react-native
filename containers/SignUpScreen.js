import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyle from "../globalStyle";
import { ScrollView } from "react-native-gesture-handler";

export default function SignUpScreen({ setToken, setId }) {
  const navigation = useNavigation();

  // States
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle login and get token from server
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          username: username,
          name: name,
          description: description,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // console.log(response.data);

      if (response.data.token) {
        setToken(response.data.token);
        setId(response.data.id);
      }
    } catch (error) {
      alert("Une erreur est survenue, veuillez réessayer");
      console.log(error.message);
    }
  };

  return (
    <View style={globalStyle.bgRed}>
      <KeyboardAwareScrollView
        extraScrollHeight={60}
        contentContainerStyle={globalStyle.containerRed}
      >
        <SafeAreaView style={globalStyle.flex1}>
          <ScrollView>
            <View style={globalStyle.safeZone}>
              <View style={globalStyle.justAlignCenter}>
                <Text style={[globalStyle.h2, globalStyle.textWhite]}>
                  Rejoignez-Nous
                </Text>
              </View>
              <TextInput
                autoCompleteType="email"
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={[
                  globalStyle.textWhite,
                  globalStyle.baseText,
                  globalStyle.inputWhite,
                ]}
                placeholderTextColor="#FDD8DA"
              />
              <TextInput
                autoCompleteType="username"
                textContentType="username"
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
                style={[
                  globalStyle.textWhite,
                  globalStyle.baseText,
                  globalStyle.inputWhite,
                ]}
                placeholderTextColor="#FDD8DA"
              />
              <TextInput
                autoCompleteType="name"
                textContentType="name"
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
                style={[
                  globalStyle.textWhite,
                  globalStyle.baseText,
                  globalStyle.inputWhite,
                  globalStyle.mB10,
                ]}
                placeholderTextColor="#FDD8DA"
              />
              <TextInput
                multiline={true}
                numberOfLines={6}
                placeholder="Décrivez-vous en quelques mots..."
                onChangeText={(text) => setDescription(text)}
                value={description}
                style={[
                  globalStyle.textWhite,
                  globalStyle.baseText,
                  globalStyle.inputWhite,
                  globalStyle.textArea,
                  globalStyle.borderWhiteFull,
                ]}
                placeholderTextColor="#FDD8DA"
              />
              <TextInput
                textContentType="password"
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={[
                  globalStyle.textWhite,
                  globalStyle.baseText,
                  globalStyle.inputWhite,
                ]}
                placeholderTextColor="#FDD8DA"
              />
              <TextInput
                textContentType="password"
                placeholder="Confirmez le mot de passe"
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
                returnKeyType="join"
                onSubmitEditing={handleSubmit}
                value={confirmPassword}
                style={[
                  globalStyle.textWhite,
                  globalStyle.baseText,
                  globalStyle.inputWhite,
                ]}
                placeholderTextColor="#FDD8DA"
              />
              <View style={[globalStyle.justAlignCenter, globalStyle.mT40]}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    globalStyle.secondaryButton,
                    globalStyle.justAlignCenter,
                    globalStyle.mB20,
                  ]}
                >
                  <Text style={[globalStyle.secondaryButtonText]}>
                    S'inscrire
                  </Text>
                </TouchableOpacity>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("SignIn");
                  }}
                >
                  <Text
                    style={[
                      globalStyle.textWhite,
                      globalStyle.link,
                      globalStyle.baseText,
                    ]}
                  >
                    Déjà un compte ? Se connecter
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
}
