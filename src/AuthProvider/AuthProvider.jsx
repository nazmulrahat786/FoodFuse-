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
  const [email, setEmail] = useState(null); // kept as requested

  const googleProvider = new GoogleAuthProvider();

  // Google Login (name unchanged)
  const loginInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await updateProfile(user, {
            displayName: user.displayName || "User",
            photoURL: user.photoURL || "https://via.placeholder.com/40",
          });
          setUser(user); // update user here for immediate UI update
        }
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Register with email
  const registerWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Login with email
  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Update profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile).then(() => {
      setUser({ ...auth.currentUser, ...profile });
    });
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // Track auth state - runs once on mount
  useEffect(() => {
    const connection = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          ...currentUser,
          photoURL: currentUser.photoURL || "https://via.placeholder.com/40",
        });

        const users = { email: currentUser.email };

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/jwt`,
            users,
            { withCredentials: true }
          );
          if (import.meta.env.DEV) console.log("JWT response:", res.data);
        } catch (err) {
          console.error("JWT error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/logout`,
            {},
            { withCredentials: true }
          );
          if (import.meta.env.DEV) console.log("Logout response:", res.data);
        } catch (err) {
          console.error("Logout error:", err);
        } finally {
          setLoading(false);
        }
      }
    });

    return connection; // cleanup
  }, []);

  const authInfo = {
    user,
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
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
