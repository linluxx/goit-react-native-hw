import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
  },

  wrap: {
    backgroundColor: "#fff",
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
    color: "#124250",
    fontFamily: "Roboto-Bold",
    fontWight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginTop: 32,
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
    backgroundColor: "#124250",
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
    textAlign: "center",
  },
  addBtn: {
    zIndex: 2,
    position: "absolute",
    top: 21,
    left: 238,
  },
});
