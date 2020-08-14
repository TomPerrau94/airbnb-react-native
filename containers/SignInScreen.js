import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import globalStyle from "../globalStyle";
import { AntDesign } from "@expo/vector-icons";

const SignInScreen = ({ setToken, setId }) => {
  const navigation = useNavigation();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login and get token from server
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

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
        extraScrollHeight={130}
        contentContainerStyle={globalStyle.containerRed}
      >
        <SafeAreaView>
          <View style={globalStyle.justAlignCenter}>
            <AntDesign name="home" size={150} color="white" />
          </View>
          <View style={globalStyle.safeZoneHorizontal}>
            <TextInput
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
              autoCapitalize="none"
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
              textContentType="password"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
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
                  Se connecter
                </Text>
              </TouchableOpacity>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text
                  style={[
                    globalStyle.textWhite,
                    globalStyle.link,
                    globalStyle.baseText,
                  ]}
                >
                  Pas de compte ? S'inscrire
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignInScreen;
