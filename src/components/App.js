/*jshint esversion: 6 */

import React from 'react';
import './App.css';

import NavigationBar from './NavigationBar';



class App extends React.Component {
  render() {
    return (
    		<div className="App">
		      <div className="ui container">
		        <NavigationBar />
		        <div className="main">
					{this.props.children}
				</div>	
		      </div>
		    </div>  
    );
  }
}

export default App;
