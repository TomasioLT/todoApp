import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormGroup,
  FormLabel,
  List,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  querySnapshot,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // create Todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: "20px",
      }}>
      <Typography variant="h3">ToDo App</Typography>
      <Divider />
      <form onSubmit={createTodo}>
        <Box sx={{ display: "flex", gap: "15px" }}>
          <FormGroup>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add item"
              type="text"></TextField>
          </FormGroup>
          <Button variant="contained" endIcon={<Add />} type="submit">
            Add
          </Button>
        </Box>
      </form>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </List>
      {todos.length < 1 ? null : (
        <Typography>{`You have ${todos.length} todos`}</Typography>
      )}
    </Box>
  );
}

export default App;
