import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialTodoState = {
  todos: [
    {
      id: nanoid(),
      title: "chore",
      description: "take out trash",
      complete: false,
    },
    {
      id: nanoid(),
      title: "chore",
      description: "walk the dog",
      complete: false,
    },
    {
      id: nanoid(),
      title: "chore",
      description: "clean the bathroom",
      complete: false,
    },
  ],
  toggleForm: true,
  todoUpdate: {},
  error: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    // Add to-do logic
    todoAdded: (state, action) => {
      const length = action.payload.description.length;
      if (length > 140) {
        state.error = false;
      } else {
        state.error = true;
        state.todos = [...state.todos, action.payload];
      }
    },
    // Delete to-do logic
    todoDeleted: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // Change complete boolean
    todoComplete: (state, action) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, complete: !todo.complete }
          : todo
      );
      state.todos = updatedTodos;
    },
    // Toggle form visibility and update task
    toggleForm: (state, action) => {
      state.toggleForm = !state.toggleForm;
      state.todoUpdate = { ...state.todoUpdate, ...action.payload };
    },
    // Update to-do logic
    todoUpdated: (state, action) => {
      const todoToUpdate = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      todoToUpdate.title = action.payload.title;
      todoToUpdate.description = action.payload.description;
      state.toggleForm = !state.toggleForm;
    },
  },
});

export const { todoAdded, todoDeleted, todoComplete, toggleForm, todoUpdated } =
  todoSlice.actions;
export default todoSlice.reducer;
