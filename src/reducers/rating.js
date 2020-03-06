const ratingInitialState = {
  ratings: [],
  currentRating: null,
  selectedIndex: null,
  hoveredIndex: null
};

const AT = {
  RATE: "RATE"
};

const loginReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case AT.RATE: {
      return {};
    }

    default:
      return state;
  }
};
