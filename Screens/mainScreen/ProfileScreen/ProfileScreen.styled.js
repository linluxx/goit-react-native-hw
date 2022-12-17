import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
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
    height: 600,
  },
  avatar: {
    zIndex: 1,
    position: "absolute",
    top: -55,
    left: 135,
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
    marginTop: 92,
    marginBottom: 32,
  },

  addBtn: {
    zIndex: 2,
    position: "absolute",
    top: 21,
    left: 240,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  exitBtn: {
    zIndex: 2,
    position: "absolute",
    top: 25,
    right: 10,
  },

  postWrap: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },

  postName: {
    marginVertical: 8,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 19,
    color: "#124250",
  },
  postLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
    marginRight: 24,
  },
  place: {
    flexDirection: "row",
  },
  placeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#124250",
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});

export default styles;
