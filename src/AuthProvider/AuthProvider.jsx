import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [refetch, setRefetch] = useState();
  const googleProvider = new GoogleAuthProvider();

  // Google Login
  const loginInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          // Ensure user profile gets updated
          await updateProfile(user, {
            displayName: user.displayName || "User",
            photoURL: user.photoURL || "https://via.placeholder.com/40",
          });

          // Set user state properly
          setUser({
            ...user,
            displayName: user.displayName,
            photoURL: user.photoURL || "https://via.placeholder.com/40",
          });
        }
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error);
      });
  };

  // Register with Email
  const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login With Email and Password
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update Profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile).then(() => {
      setUser({ ...auth.currentUser, ...profile });
    });
  };

  // Logout
  const logOut = () => {
    return signOut(auth).then(() => {
      setUser(null);
    });
  };

  // UseEffect to Track Auth Changes
  useEffect(() => {
    const connection = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          ...currentUser,
          photoURL: currentUser.photoURL || "https://via.placeholder.com/40",
        });

        const users = { email: currentUser.email };
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/jwt`, users, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setLoading(false);
          });
      } else {
        setUser(null);
        axios
          .post(
            `${import.meta.env.VITE_BASE_URL}/logout`,
            {},
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            setLoading(false);
          });
      }
    });

    return () => connection();
  }, [refetch]);

  // Auth Info
  const authInfo = {
    user,
    setRefetch,
    loading,
    setLoading,
    email,
    setEmail,
    loginInWithGoogle,
    registerWithEmail,
    loginWithEmail,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
