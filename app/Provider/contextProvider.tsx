import { createContext } from "react";

export const AuthContext = createContext(null);

const ContextProvider = ({ children }) => {
  // You can wire up any user context here if needed later.
  return (
    <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
