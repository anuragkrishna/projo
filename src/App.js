/*jshint esversion: 6 */

import React from 'react';
import './App.css';

import NavigationBar from './components/NavigationBar';



class App extends React.Component {
  render() {
    return (
    		<div className="App">
		      <div className="ui container">
		        <NavigationBar />
				{this.props.children}
		      </div>
		    </div>  
    );
  }
}

export default App;
