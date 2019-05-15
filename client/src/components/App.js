import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Header from './Header';
import About from './pages/About';
import Admission from './admission/Admission';
import Chatbot from './chatbot/Chatbot';


const App = () => 
	   (
		<div> 
			<BrowserRouter>
               <div className="container">
               <Header />
               	<Route exact path="/" component={Landing} />
               	<Route exact path="/about" component={About} />
               	<Route exact path="/admission" component={Admission} />   
               	<Chatbot />
               </div>
       		</BrowserRouter>

		</div>
		)

export default App;