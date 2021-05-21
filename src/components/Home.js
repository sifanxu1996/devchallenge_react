import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NASA_API_KEY } from "../shared/api";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

export default function Home() {
  const dispatch = useDispatch();
  const [date, setDate] = React.useState("");
  const [dateImage, setDateImage] = React.useState();
  const favorites = useSelector((state) => state.favoriteReducer.favorites);

  React.useEffect(() => {
    if (date === "") return;

    fetchData(
      "https://api.nasa.gov/planetary/apod?api_key=" +
        NASA_API_KEY +
        "&date=" +
        formatDate(date)
    ).then((data) => {
      setDateImage(data.url);
    });
  }, [date]);

  const incrementDate = (value) => {
    setDate((prevDate) => {
      const currentDate = new Date(prevDate);
      console.log(currentDate);
      return currentDate.setDate(currentDate.getDate() + value);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "addFavorite",
      payload: dateImage,
    });
  };

  return (
    <React.Fragment>
      <div className="home">
        <Link className="home-link" to="/nasaphoto">
          See into the stars!
        </Link>
        <img alt="select a date" src={dateImage} />
        <form onSubmit={onSubmit}>
          <label>Date:</label>
          <input
            type="date"
            id="apodDate"
            name="apodDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          { date !== "" ? <button type="button" onClick={() => incrementDate(-1)}>Prev</button> : null }
          { date !== "" ? <button type="button" onClick={() => incrementDate(1)}>Next</button> : null }
          <button type="submit">Favorite this Image</button>
        </form>
      </div>
      <div>
        {favorites.map((favorite, index) => {
          return <img key={index} alt={favorite} src={favorite}/>
        })}
      </div>
    </React.Fragment>
  );
}
