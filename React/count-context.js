import React, { useContext } from "react";

const countContext = React.createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "INCREMENT": {
      return {
        count: state.count + 1,
      };
    }
    case "DECREMENT": {
      return {
        count: state.count - 1,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  const value = { state, dispatch };
  return (
    <countContext.Provider value={value}>{children}</countContext.Provider>
  );
}

function useCount() {
  const context = useContext(countContext);
  if (!context) throw new Error(`usecount must be used within countprovider`);
  return context;
}

export { CountProvider , useCount};

function App() {
  return (
    <CountProvider>
      <Content />
    </CountProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
