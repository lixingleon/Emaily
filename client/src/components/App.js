import React,{Component} from 'react';
//BrowserRouter is the brain of react router
//Route set rules
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from "./surveys/SurveyNew";

class App extends Component{

    componentDidMount() {
        //call action creator!!!!
        this.props.fetchUser();
    }

    render() {
        //console.log(this.state);
        return(
            <div className="container">
                <BrowserRouter>
                    <div className="container">
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
const mapStateToProps = (state)=>{
    console.log(state);
}
export default connect(mapStateToProps, actions)(App);