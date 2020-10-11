import React, { Component, useState, useEffect } from 'react';
import './App.css';


function WeatherData(props){
  const [loadedObj, setLoaded] = useState({loaded : false});

  useEffect(() => {

    console.log(loadedObj.loaded)
    if(loadedObj.loaded) {
      let icon = document.getElementById("weather_icon").contentDocument;
      let grid = icon.getElementById("Grid_1_");
      if(grid !== null)
      {
        grid.setAttribute("display", "none")
      }
      let svg = null;
      for(let e of icon.childNodes) {
        if(e.tagName === "svg") {
          svg = e;
          break;
        }
      }
      document.getElementById("weather_icon").style.visibility="visible"

      if(svg != null) {
        svg.setAttribute("width", "128px");
        svg.setAttribute("height", "128px");
        let path = svg.getElementsByTagName("path")[0]
        path.setAttribute("fill", "#FAFAFA")
      }
    

      setLoaded({loaded : false})
    }

  });


  return (
    <div className="weatherData">
      <div className="weather_city">
        {props.info.city}
      </div>
      <div className="weather_main_container">
        <div className="weather_main_left">
          <object id="weather_icon" data={props.info.weather.image} type="image/svg+xml"
            onLoad={() => {if(props.info.weather.image !== "")
            document.getElementById("weather_icon").style.visibility="hidden";

                      setLoaded({loaded : true})}
                    }
          >

          </object>
        </div>
        <div className="weather_main_right">
      
          <div className="weather_temp_add">
            {props.info.temp.min}°&darr; {props.info.temp.max}°&uarr;
          </div>
          <div className="weather_temp">
            <div className="weather_main_temp">{props.info.temp.temp}</div>
            <div className="weather_main_kind">°C</div>
          </div>
        </div>
      </div>
    </div>
  );
  
}


class SearchField extends React.Component
{

  update() {
    const cityToSearch = document.getElementById("searchField").value
    this.props.onUpdate(cityToSearch)
  }

  manageKey(event) {

    if(event.key === 'Enter') {
      this.update();
    }
  }

  render() {
  return (
    <div id="bar">
    <div id="searchBar">
        <input type="search" id="searchField" name="name" required
        size="40" placeholder="City..." onKeyPress={(event) => this.manageKey(event)}>
        </input>
        <button className="material-icons searchButton" onClick={() => this.update()} 
          >search</button>
    </div>
    </div>
    )
  }
}


class App extends React.Component {
  constructor()
  {
    super()
    this.state =  {
      city: "London",
      temp: {temp : 0, min : 0, max : 0, feels : 0},
      weather: {title : "unknown", description: "unknonw", image: ""}
    }
  }
  retrieveData(inParams, callback) {

    fetch('/search', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify(inParams)
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      else {
        return {"error": "error"}
      }
    })
    .then(res => callback(res))
    .catch(function(error) {
      console.error('Request failed', error);
  });
}

  processData(content) {
    console.log("process")
    this.setState({city: content.city, 
                  temp : { temp : content.temp.temp,
                            min : content.temp.temp_min,
                            max : content.temp.temp_max,
                            feels : content.temp.feels_like
                        },
                  weather: content.weather
                }
              )
  }

  handleCityChange = city => {
    this.retrieveData({city}, (json) => this.processData(json)) 
  }

  render() {
  return (
    <div className="App">
      <SearchField onUpdate={this.handleCityChange}/>
      <WeatherData info={this.state}/>
    </div>
  );
  }
}

export default App;
