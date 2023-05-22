const initalState = {
  data: [],
};

const dataReduser = (state = initalState, action) => {
  switch (action.type) {
    case "setData":
      return { data: action.payload };
    default:
      return state;
  }
};

const newItemAction = (payload) => ({
  type: "setData",
  payload,
});

export { dataReduser, newItemAction };
