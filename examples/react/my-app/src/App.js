import React, { Component } from 'react';
import './App.css';


class WeatherData extends Component{

  render() {
  return (
    <div className="weatherData">
      <div className="weather_city">
        {this.props.info.city}
      </div>
      <div className="weather_main_container">
        <div className="weather_main_left">
          <div className="weather_temp_add">
        {this.props.info.temp.min}°&darr; {this.props.info.temp.max}°&uarr;
        </div>
        <div className="weather_temp">
          <div className="weather_main_temp">{this.props.info.temp.temp}</div>
          <div className="weather_main_kind">°C</div>
        </div>
      </div>
      <div className="weather_main_right">
        <img src={this.props.info.weather.image}></img>
        </div>
      </div>

    

    </div>
  )
  }
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
