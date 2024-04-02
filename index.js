import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";

const init = "intializeAmount";
const incrementByAmount = "incrementByAmount";
const errorAmount = "errorAmount";
function accountReducer(state = { amount: 10 }, action) {
  switch (action.type) {
    case incrementByAmount:
      return { amount: state.amount + action.payload };
    case init:
      return { amount: state.amount + action.payload };
    case errorAmount:
      return { ...state, error: action.error };
    default:
      return { amount: 10 };
  }
}
function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    case incrementByAmount:
      if (action.payload >= 100) {
        return { points: state.points + 1 };
      }
    case init:
      return { points: 0 };
    default:
      return { points: 0 };
  }
}
const store = createStore(
  combineReducers({ account: accountReducer, bonus: bonusReducer }),
  applyMiddleware(logger.default, thunk)
);

function incByAmount(amount) {
  return { type: incrementByAmount, payload: amount };
}
function userAmount(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
      dispatch({ type: "intializeAmount", payload: data.amount });
    } catch (error) {
      dispatch({ type: "errorAmount", error: error.message });
    }
  };
}

store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch(incByAmount(20));
store.dispatch(userAmount(2));
