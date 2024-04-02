import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";

const init = "intializeAmount";
function reducer(state = { amount: 10 }, action) {
  switch (action.type) {
    case init:
      return { amount: state.amount + action.payload };
    default:
      return { amount: 10 };
  }
}
const store = createStore(reducer, applyMiddleware(logger.default, thunk));

function userAmount(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    dispatch({ type: "intializeAmount", payload: data.amount });
  };
}

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(userAmount(4));
