// import logo from './logo.svg';
// import './App.css';

// import { useState, useEffect } from "react";
// import axios from "axios";



// function RedditPost() {

//   const [posts, setPosts] = useState([]);

//   useEffect(() => {

//     axios.get(`https://www.reddit.com/r/reactjs.json`)
//       .then(res => {
//         const newPosts = res.data.data.children
//           .map(obj => obj.data);

//         setPosts(newPosts);
//       });

//   }, [])

//   return (
//     <div>
//       {/* <h6> {posts[0]?.title}</h6>
//       <h6> {posts[1]?.title}</h6>
//       <h6> {posts[2]?.title}</h6>
//       <h6> {posts[3]?.title}</h6>
//       <h6> {posts[4]?.title}</h6> */}

//       {posts.map((eachpost, postIndex) => {
//         return <div>

//           <h3 key={postIndex}>
//             {eachpost.title}
//           </h3>
//           <p>
//             {eachpost.selftext}
//           </p>

//           {(eachpost.thumbnail !== "self") ?
//             <img src={eachpost.thumbnail} alt="thumbnail" />
//             :
//             null
//           }
//         </div>
//       })}

//     </div>
//   );

// }


// function Weather() {

//   const [weather, setWeather] = useState({});
//   const [city, setCity] = useState("Karachi");
//   // const cityName = slots.cityName;
//   const API_key = "4aab8ed3001c3406aba47a6797f8f0f8";
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

//   useEffect(() => {

//     axios.get(url)
//       .then(res => { setWeather(res.data); });

//   }, []);

//   function getWeather(e) {
//     e.preventDefault();
//     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`)
//       .then(res => { setWeather(res.data); });
//   }

//   return (
//     <div>

//       <form onSubmit={getWeather}>
//         <input type="text" onChange={(e) => { setCity(e.target.value) }} />
//         <button type="submit">Get Weather</button>
//       </form>

//       {weather.current ? (
//         <>
//           <h1>Weather of {weather?.name}</h1>
//           <h2>
//             {weather.main.temp}°C (feels like: {weather.main.feels_like}°C)
//           </h2>
//           <h2>humidity: {weather.main.humidity}</h2>

//           <h2>Wind speed: {weather?.current?.wind_kph} Km/h </h2>
//           <h2>wind coming from: {weather?.current?.wind_dir}</h2>
//         </>
//       ) : <h1>Loading...</h1>}
//     </div>
//   )

// }



// function App() {
//   return <Weather />;
// }
// export default App;

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function App() {

  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const apiKey = "4aab8ed3001c3406aba47a6797f8f0f8";

  const apiCall = async (e) => {
      e.preventDefault()
      const loc = e.target.elements.loc.value
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
      const req = axios.get(url);
      const res = await req;
      setWeather({
          descp: res.data.weather[0].description,
          temp: res.data.main.temp,
          city: res.data.name,
          humidity: res.data.main.humidity,
          press: res.data.main.pressure,
      })

      setCity(res.data.name)

  }

  //Converting K to C
  let k = weather.temp;
  let C = k - 273.15

  const Weath = () => {
      return <div>
          <div className="winfo">
              Weather information for {city}
              <hr></hr>
          </div>
          <div className="Weath">
              <div className="welement">
                  Weather : {weather.descp}
              </div>
              <div className="welement">
                  Temperature : {C.toFixed(2)} &#8451;
              </div>
              <div className="welement">
                  Humidity :{weather.humidity} %
              </div>
              <div className="welement">
                  Pressure :  {weather.press} mb
              </div>
          </div>
      </div>
  }
  return (<>
      <div className="weathhead">Weather Info</div>
      <div className="mainweather">
          <div className="weather">
              <form onSubmit={apiCall} className="form">
                  <input type="text" 
                   placeholder="city" 
                   name="loc" />
                  <button className="bttn">Search</button>
              </form>

              {weather && <Weath />}
          </div>
      </div>
  </>
  )
}

export default App