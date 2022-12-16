// import firebaseApp from "../../firebase/config";
// import { authSlice } from "./authReducer";

// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// // const auth = getAuth();
// const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

// export const signUpUser =
//   ({ login, email, password }) =>
//   async (dispatch, getState) => {
//     console.log(login, email, password);

//     try {
//       const { user } = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const currentUser = auth.currentUser;
//       await updateProfile(currentUser, {
//         displayName: login,
//       });
//       const { displayName, uid } = auth.currentUser;
//       dispatch(
//         authSlice.actions.updateUserProfile({ userId: uid, login: displayName })
//       );
//       console.log("user", user);
//     } catch (error) {
//       console.log("error", error), console.log("error.message", error.message);
//     }
//   };

// export const signInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       const user = await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.log("error", error), console.log("error.message", error.message);
//     }
//   };

// export const signOutUser = () => async (dispatch, getState) => {
//   await auth.signOut();
//   dispatch(authSignOut());
// };

// export const stateChangeUser = () => async (dispatch, getState) => {
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       dispatch(
//         updateUserProfile({
//           userId: user.uid,
//           login: user.displayName,
//         })
//       );
//       dispatch(authStateChange({ stateChange: true }));
//     }
//   });
// };

import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const signUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log(login, email, password);

    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
      });

      const { displayName, uid } = await db.auth().currentUser;
      dispatch(updateUserProfile({ userId: uid, login: displayName, email }));
      console.log("user", user);
    } catch (error) {
      console.log("error", error), console.log("error.message", error.message);
    }
  };

export const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error), console.log("error.message", error.message);
    }
  };

export const signOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

export const stateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
