import Constants from "expo-constants";
import { StyleSheet, Dimensions } from "react-native";

const statusBarHeight = Constants.statusBarHeight;

const { width, height } = Dimensions.get("window");

export default globalStyle = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  containerRed: {
    flex: 1,
    backgroundColor: "#F35960",
    justifyContent: "center",
    marginTop: statusBarHeight || 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: statusBarHeight || 0,
    backgroundColor: "white",
  },
  widthHeight: {
    width: width,
    height: height,
  },
  relative: {
    position: "relative",
  },
  baseText: {
    fontSize: 16,
    lineHeight: 22,
  },
  bgRed: {
    flex: 1,
    backgroundColor: "#F35960",
  },
  bgWhite: {
    flex: 1,
    backgroundColor: "white",
  },
  textWhite: {
    color: "white",
  },
  textRed: {
    color: "#F35960",
  },
  textGrey: {
    color: "#BBBBBB",
  },
  justAlignCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  alignCenter: {
    alignItems: "center",
  },
  safeZoneHorizontal: {
    paddingHorizontal: 22,
  },
  safeZone: {
    padding: 22,
    flex: 1,
  },
  inputWhite: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 30,
  },
  borderWhiteFull: {
    borderWidth: 1,
    borderColor: "white",
  },
  inputRed: {
    borderBottomWidth: 1,
    borderBottomColor: "#F35960",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 20,
  },
  borderRedFull: {
    borderWidth: 1,
    borderColor: "#F35960",
  },
  primaryButton: {
    borderRadius: 50,
    backgroundColor: "#F35960",
    paddingHorizontal: 30,
    height: 44,
  },
  primaryButtonText: {
    fontSize: 20,
    color: "white",
  },
  secondaryButton: {
    borderRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 30,
    height: 44,
  },
  secondaryButtonText: {
    fontSize: 20,
    color: "#F35960",
  },
  tertiaryButton: {
    borderRadius: 50,
    paddingHorizontal: 30,
    borderWidth: 1.5,
    borderColor: "#F35960",
    height: 44,
  },
  tertiaryButtonText: {
    fontSize: 20,
    color: "#F35960",
  },
  link: {
    textDecorationLine: "underline",
  },
  flexRow: {
    flexDirection: "row",
  },
  mB10: {
    marginBottom: 10,
  },
  mB20: {
    marginBottom: 20,
  },
  mT20: {
    marginTop: 20,
  },
  mT30: {
    marginTop: 30,
  },
  mT40: {
    marginTop: 40,
  },
  mR30: {
    marginRight: 30,
  },
  mL10: {
    marginLeft: 10,
  },
  mR10: {
    marginRight: 10,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
  },
  textArea: {
    height: 120,
  },
  roomItemBorder: {
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: 1,
  },
  roomItemCover: {
    width: "100%",
    height: 210,
    position: "relative",
    backgroundColor: "#BBBBBB",
  },
  roomItemPrice: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    bottom: 10,
    left: 0,
    padding: 10,
  },
  roomItemPriceText: {
    color: "white",
    fontSize: 20,
  },
  roomItemInfos: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roomItemLeft: {
    flex: 1,
  },
  roomItemRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  roomItemOwnerPicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  roomItemOwnerNoPicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#BBBBBB",
  },
  roomDetailsImage: {
    width: width,
    height: 250,
    backgroundColor: "#BBBBBB",
  },
  userPicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userNoPicture: {
    width: 120,
    height: 120,
  },
  editButton: {
    position: "absolute",
    backgroundColor: "#F35960",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    left: width / 2,
  },
});
