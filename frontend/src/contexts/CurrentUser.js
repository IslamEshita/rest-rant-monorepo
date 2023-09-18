import { createContext, useEffect, useState } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        let response = await fetch(
          "http://localhost:5000/authentication/profile",
          {
            credentials: "include",
          }
        );
        let user = await response.json();
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUser.Provider>
  );
}

export default CurrentUserProvider;
