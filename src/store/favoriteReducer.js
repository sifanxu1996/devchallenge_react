const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || []
};

export function favoriteReducer(state = initialState, action) {
  switch (action.type) {
    case "addFavorite":
      if (state.favorites.includes(action.payload)) return state;
      const newFavs = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return {
        ...state,
        favorites: newFavs,
      };
    default:
      return state;
  }
}