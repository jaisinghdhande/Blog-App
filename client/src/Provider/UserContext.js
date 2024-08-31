const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("user context auth");
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((res) => {
        res.json().then((userInfo) => {
          console.log("called", userInfo);
          setUserInfo(userInfo);
          setIsLoading(false);
        });
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("Auth Error");
      });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUserInfo(null);
    });
  }

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
