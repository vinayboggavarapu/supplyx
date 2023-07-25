const { createContext, useState } = require("react");

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);

  return (
    <StateContext.Provider value={{ notification, setNotification }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
