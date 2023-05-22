import { createStore } from "redux";
import { joinedRedusers } from "./combineReduser";
const store = createStore(
  joinedRedusers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
