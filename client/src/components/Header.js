import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';
class Header extends Component{
    renderContent(){
        //this.props.auth 是authReducer返回的东西
        switch (this.props.auth1){
            case null:
                //dont show anything when app hasnt recognized user
                return;
            case false:
                return (
                    //href directs user to go to a completely different domain
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return [    //return an array
                    <li key="1"><Payments/></li>,
                    <li key={'3'} style={{margin:'0 10px'}}>
                        Credit:{this.props.auth1.credits}
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        //console.log(this.props);
        return(
        <nav>
            <div className="nav-wrapper">
                <Link
                    to={this.props.auth1? '/surveys': '/'}
                    className="left brand-logo"
                >
                    Emaily
                </Link>
                <ul className="right">
                    {this.renderContent()}
                </ul>
            </div>
        </nav>
        );

    }
}

function mapStateToProps(state){
    return {auth1:state.auth1};
}
export default connect(mapStateToProps)(Header);