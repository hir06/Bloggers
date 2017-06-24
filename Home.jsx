import React from 'react';


import { BrowserHistory } from 'react-router-dom';
import { withRouter, Link } from "react-router-dom";
import { LazyLoad } from 'react-lazy-load';
import { InfiniteScroll } from 'react-infinite-scroll';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }

  }

  loadData() {
    fetch('blogdata.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }



  componentDidMount() {
    this.loadData()
  }

  render() {

    const blocks = this.state.data.map((item, i) => {

      const onClick = () => this.signOrder(item.name);
      <div className="col l2">&nbsp;</div>
      return <div className="col s12 m4 l3 dashboard" key={i}>
        <div className="card">
          <img src={item.image} />
          <span>{item.timestamp}</span>
          <div className="overlay" >
            <div className="text">
              <h2 className="card-title grey-text text-darken-4">{item.Name}</h2>
              <span key={item.Name}> <Link to={`/detail/${item.Name}`}>View details</Link></span>

            </div>
          </div>




        </div>
      </div>;
    });

    return <div>

      <div className="row container">

        {blocks}
      </div>

    </div>

  }
}


export default withRouter(Home);