import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  wrap: {
    backgroundColor: "#fff",
    height: 549,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  avatar: {
    zIndex: 1,
    position: "absolute",
    top: -55,
    left: 135,
    backgroundColor: "#f6f6f6",
    height: 120,
    width: 120,
    borderRadius: 16,
  },

  title: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontWight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginTop: 92,
    marginBottom: 32,
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    width: 343,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 15,
    color: "#212121",
  },
  btn: {
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  showBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },

  showBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    lineHeight: 19,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },

  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  addBtn: {
    zIndex: 2,
    position: "absolute",
    top: 21,
    left: 238,
  },
});
