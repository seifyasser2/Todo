import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TodosContext } from "../Context/TodosContext";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo, handleClick }) {
  const [showDeleteDialog, setShowDeleteDailog] = useState(false);
  const [showUpadteDialog, setShowUpdateDailog] = useState(false);
  const [updatedTodo, setupdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const { todos, setTodos } = useContext(TodosContext);

  function handleDeletClick() {
    setShowDeleteDailog(true);
  }
  function handleUpdateClick() {
    setShowUpdateDailog(true);
  }

  function handleDeleteclose() {
    setShowDeleteDailog(false);
  }

  function handleUpdateclose() {
    setShowUpdateDailog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatdeTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatdeTodos);
    setShowUpdateDailog(false);
    localStorage.setItem("todos", JSON.stringify(updatdeTodos));
  }

  function handleCheckClick() {
    const updatdeTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatdeTodos);
    localStorage.setItem("todos", JSON.stringify(updatdeTodos));
  }
  return (
    <>
      {/* deletModel */}
      <Dialog
        onClose={handleDeleteclose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete the task, you won’t be able to restore it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteclose}>Close</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            done
          </Button>
        </DialogActions>
      </Dialog>
      {/* deletModel */}

      {/*   update dialog */}
      <Dialog
        onClose={handleUpdateclose}
        open={showUpadteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update the task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="The title"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setupdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="details"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setupdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateclose}>Close</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            done
          </Button>
        </DialogActions>
      </Dialog>
      {/*   update dialog */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#3B3B5C",
          marginTop: 6,
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              {" "}
              <Typography
                variant="h5"
                style={{ textAlign: "left", color: "#FFD369",textDecoration:todo.isCompleted?"line-through":"null"}}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                style={{ textAlign: "left", color: "#EDEDED" }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check */}
              <IconButton
                onClick={(id) => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#4CAF50",
                  background: todo.isCompleted ? "#4CAF50" : "white",
                  border: "5bc34a",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* Check */}

              {/* update */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "1769aa",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/* update */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23217",
                  background: "white",
                  border: "5bc34a",
                }}
                onClick={handleDeletClick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
