import React,{Component} from 'react';
//BrowserRouter is the brain of react router
//Route set rules
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component{

    componentDidMount() {
        //call action creator!!!!
        this.props.fetchUser();
    }

    render() {
        return(
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header/>
                        {/*router greedily matches all routes that matches incoming url*/}
                        {/*so use 'exactly' keyword or 'exact'*/}
                        {/*exactly = {true}*/}
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys" component={Dashboard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }

};
export default connect(null, actions)(App);