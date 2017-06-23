import React, {Component} from 'react';
// require ("../content/style.css");

class Leftside extends Component {
    render() {
        return (
           <nav>
            <div className="nav-wrapper">
              
            <div> <i className="material-icons" >dashboard</i><span> Bloggers</span> </div>
            </div>
        </nav>
        );
    }
}

export default Leftside;