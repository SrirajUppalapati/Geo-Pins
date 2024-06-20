import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false, message: null };

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        message: "successful Login",
        user: action.payload,
      };
    case "logout":
      return { initialState };
    case "login/incorrect":
      return {
        ...state,
        isAuthenticated: false,
        message: "Please check your username/password",
      };
    default:
      throw new Error("AuthProvider reducer is not working");
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAuthenticated, user } = state;

  function login(username, password) {
    if (username !== FAKE_USER.email || password !== FAKE_USER.password) {
      dispatch({ type: "login/incorrect" });
    } else {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext is used outside Provider");
  return context;
}

export { AuthProvider, useAuth };
