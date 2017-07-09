import React from 'react';


import { BrowserHistory } from 'react-router-dom';
import { withRouter, Link } from "react-router-dom";
import { LazyLoad } from 'react-lazy-load';
// import { InfiniteScroll } from 'react-infinite-scroll-component';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {data: [], requestSent: false}

  }

  componentDidMount() {
    debugger;
    
    
    const $scrollElement = $('.container')
    $scrollElement.on('scroll', () => {
        const scroll = $scrollElement.height() + $scrollElement.scrollTop() + this.props.scrollEndThreshold;
        const progress = scroll / $scrollElement.find('.scroll-element').height() * 100 || 0;
        if (progress >= 100) {
            this.querySearchResult();
        }
    });

    this.initFakeData();
  
  }
    componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }
  loadData() {
    fetch('blogdata.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data })
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }
  createFakeData(startKey, counter) {
    var i = 0;
    var data = [];
    for (i = 0; i < counter; i++) {
      var fakeData = (<div key={startKey+i} className="data-info">Fake Data {startKey+i}</div>);
      data.push(fakeData);
    }

    return data;
  }


    initFakeData() {
    var data = this.createFakeData(this.state.data.length, 10);

    this.setState({data: data});
  }
  querySearchResult() {
    if (this.state.requestSent) {
      return;
    }

    // enumerate a slow query
    setTimeout(this.doQuery, 2000);

    this.setState({requestSent: true});
  }
doQuery() {
   debugger;
    $.ajax({
      url: "blogdata.json",
      data: null,
      method: "GET",
      success: function(data, textStatus, jqXHR) {
        var fakeData = data.slice(0,5);// this.createFakeData(this.state.data.length, 10);
        var newData = this.state.data.concat(fakeData);
        this.setState({data: newData, requestSent: false});
      }.bind(this),
      error: function(jqXHR, textStatus, errorThrown) {
        this.setState({requestSent: false});
      }.bind(this)
    });
  }
  
  handleOnScroll() {
     debugger;
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.querySearchResult();
    }
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
        <div className="scroll-element">
          {blocks}
        </div>
      </div>

    </div>

  }
}


export default withRouter(Home);