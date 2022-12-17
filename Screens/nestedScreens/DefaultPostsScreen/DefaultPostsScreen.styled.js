import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  profileWrap: {
    flexDirection: "row",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  textWrap: {
    marginLeft: 8,
    marginTop: 16,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#124250",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#124250",
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
    marginRight: 24,
  },
  commentsCount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
  },
  likes: {
    color: "#BDBDBD",
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
