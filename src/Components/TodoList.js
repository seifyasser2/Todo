import * as React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
// import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
// import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
// import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import { useState, useEffect } from "react";
import { TodosContext } from "../Context/TodosContext";
import { useContext } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, settitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const compoletedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompoletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todosTobeRender = todos;
  if (displayedTodosType == "Completed") {
    todosTobeRender = compoletedTodos;
  } else if (displayedTodosType == "non-Completed") {
    todosTobeRender = notCompoletedTodos;
  }else{
    todosTobeRender = todos;
  }
  const todosjsx = todosTobeRender.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  //Filteration arrays

  useEffect(() => {
    const storagetodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storagetodos);
  }, []);

  function changeDisplaytype(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick(id) {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatdeTodos = [...todos, newTodo];
    setTodos(updatdeTodos);
    localStorage.setItem("todos", JSON.stringify(updatdeTodos));
    settitleInput("");
  }

  return (
    <Container maxWidth="md">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography variant="h1" style={{ fontWeight: "bold" }}>
            Tasks
          </Typography>
          <Divider />
          {/*  Filte*/}
          <ToggleButtonGroup
            style={{ marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplaytype}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="Completed">Completed</ToggleButton>
            <ToggleButton value="non-Completed">Not Completed </ToggleButton>
          </ToggleButtonGroup>
          {/*  Filte*/}
          {/* ==All Todos== */}

          {todosjsx}

          {/* ==All Todos== */}
          {/*   input + Add button */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Title of task"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  settitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%", background: "#d32f2f",color:"white" }}
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length == 0 }
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/*   input + Add button */}
        </CardContent>
      </Card>
    </Container>
  );
}
