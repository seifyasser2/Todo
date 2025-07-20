import logo from "./logo.svg";
import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Context/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
const theme = createTheme({
  Typography: {
    fontFamily: ["cairo"],
  },
  palette:{
    primary:{
      main:"#827717"
    }
  }
});
const initialtodos = [
  {
    id: uuidv4(),
    title: "playing",
    details: "play football",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "playing",
    details: "play tennis",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "playing",
    details: "play swimming",
    isCompleted: false,
  },
];

function App() {
   const [todos, setTodos] = useState(initialtodos);
  return (
    <ThemeProvider theme={theme} >

    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
       
      }}
    >  <TodosContext.Provider value={{todos:todos,setTodos:setTodos}}>
          <TodoList />
    </TodosContext.Provider>
     
    </div>
    </ThemeProvider>
  );
}

export default App;
