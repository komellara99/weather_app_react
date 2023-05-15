import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [background, setBackground] = useState('./assets/sunny.gif')
  //const weather_options = ['Rain', 'Clouds', 'Clear']
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3e5580ce0f2a3e6b40d3304b943a6215`
  useEffect(() => {
    
  }, [background]);

  const searchLocation = (event) => {
    if(event.key === 'Enter'){ 
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
      setBackground(`./assets/${response.data.weather[0].main.toLowerCase()}.gif`)
      console.log(background)
    })
    setLocation('')
    
  }
}
  
  return ( 
    <div className={`App ${data.weather[0].main.toLowerCase()}`}>
      <div className = 'search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter city'
        type='text'
        />
        
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div> 
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            
          </div>
          <div className="description">
            {data.main ? <p>{data.weather[0].main}</p> : null}
            
          </div>
        </div>
        {data.main ? 
        <div className="bottom">
          <div className="feelslike">
            {data.main ? <p className="b">{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="b">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="temperature">
            {data.main ? <p className="b">{data.wind.speed} km/h</p> : null}
            <p>Winds</p>
          </div>
        </div> : null}
      </div>
    </div>
  );
}

export default App;
