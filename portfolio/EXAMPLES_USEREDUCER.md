# useReducer Practical Examples

## Example 1: Simple Counter

```jsx
import { useReducer } from 'react';

// The reducer function
function counterReducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}

export default Counter;
```

**Key Points:**
- Reducer is a pure function: (state, action) => newState
- Initial state is the second argument: 0
- dispatch sends actions to the reducer
- Reducer returns new state based on action type

---

## Example 2: Todo App with useReducer

```jsx
import { useReducer, useState } from 'react';

// Initial state
const initialState = {
  todos: [],
  filter: 'all' // all, active, completed
};

// Reducer function
function todoReducer(state, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            createdAt: new Date()
          }
        ]
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  // Get filtered todos
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>My Todos</h1>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          style={{ padding: '8px', width: '80%' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Add
        </button>
      </form>

      {/* Filter Buttons */}
      <div style={{ margin: '20px 0' }}>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
          style={{
            fontWeight: state.filter === 'all' ? 'bold' : 'normal',
            marginRight: '10px'
          }}
        >
          All ({state.todos.length})
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
          style={{
            fontWeight: state.filter === 'active' ? 'bold' : 'normal',
            marginRight: '10px'
          }}
        >
          Active ({state.todos.filter(t => !t.completed).length})
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
          style={{
            fontWeight: state.filter === 'completed' ? 'bold' : 'normal'
          }}
        >
          Completed ({state.todos.filter(t => t.completed).length})
        </button>
      </div>

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : '#000'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              style={{ marginRight: '10px' }}
            />
            <span style={{ flex: 1 }}>{todo.text}</span>
            <button
              onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
              style={{ padding: '4px 8px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Clear Completed Button */}
      {state.todos.some(t => t.completed) && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          style={{ marginTop: '20px', padding: '8px 16px' }}
        >
          Clear Completed
        </button>
      )}

      {filteredTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>
          No todos here! 🎉
        </p>
      )}
    </div>
  );
}

export default TodoApp;
```

**Key Concepts:**
- `initialState` has multiple values (todos array + filter string)
- Each action has a `type` and optional `payload`
- Reducer returns new state objects (never mutate directly)
- Use spread operator (...) for immutability
- Dispatch is called with action object

---

## Example 3: Form State Management

```jsx
import { useReducer } from 'react';

const initialFormState = {
  formData: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false
};

function formReducer(state, action) {
  switch(action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value
        }
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message
        }
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };

    case 'START_SUBMIT':
      return {
        ...state,
        isSubmitting: true
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        formData: initialFormState.formData
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        errors: action.payload
      };

    case 'RESET':
      return initialFormState;

    default:
      return state;
  }
}

function SignupForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_FIELD',
      payload: { name, value }
    });
    // Clear error when user starts typing
    if (state.errors[name]) {
      dispatch({
        type: 'SET_ERROR',
        payload: { field: name, message: '' }
      });
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!state.formData.username) {
      errors.username = 'Username is required';
    }
    if (!state.formData.email) {
      errors.email = 'Email is required';
    }
    if (!state.formData.password) {
      errors.password = 'Password is required';
    }
    if (state.formData.password !== state.formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: errors
      });
      return;
    }

    dispatch({ type: 'START_SUBMIT' });

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', state.formData);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Sign Up</h2>

      {state.isSubmitted && (
        <div style={{ padding: '10px', background: '#d4edda', color: '#155724' }}>
          ✓ Account created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: