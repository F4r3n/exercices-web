import React, { Component } from 'react';
import './App.css';


class WeatherData extends Component{

  render() {
  return (
    <div className="weatherData">
      City: {this.props.info.city}
      <ul>
        <li>Temperature {this.props.info.temp}°C</li>
      </ul>
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
      temp: 0
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
    console.log(content)
    this.setState({city: content.city, 
                  temp : content.temp.temp
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
