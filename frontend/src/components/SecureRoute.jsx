import React, { useEffect, useState } from "react";
import authStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const SecureRoute = ({ children }) => {
  const { user } = authStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure Zustand has hydrated before showing the UI
    const unsubscribe = authStore.subscribe(() => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;
  console.log("user" + user);
  if (!user) return <Navigate to={"/login"} replace />;
  if (user) children;
  return children;
};

export default SecureRoute;
