import React from 'react';
import SiteHeader from "./common/header";
import Leftside from "./common/leftPanel";
import { BrowserHistory } from 'react-router-dom';
import {withRouter,Link} from "react-router-dom";
import {LazyLoad} from 'react-lazy-load';
import {InfiniteScroll} from 'react-infinite-scroll';

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { data: [] }
		this.signOrder = this.signOrder.bind(this);
	}
	
	loadData() {
		fetch('blogdata.json')
			.then(response => response.json())
			.then(data => {
				this.setState({data: data })
		})
			.catch(err => console.error(this.props.url, err.toString()))
	}
	loadMore (page) {
	  debugger;
    console.log('load');
    setTimeout(function () {
      this.setState({
        data: this.state.data.concat([createDiv(page)]),
        hasMore: (page < 2)
      });
    }.bind(this), 1000);
  }
	
	signOrder(id) {
		console.log(id);
		const name=id;
		debugger;
		//this.props.history.push("/detail");
		this.props.history.push({pathname: '/detail/${name}',
 
  state: { projectName: 'id' }})
		
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
						     <img src={item.image}/>
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

    return   <div>
	 {/*<InfiniteScroll
        pageStart={0}
        loadMore={loadFunc()}
        hasMore={true || false}
        loader={<div className="loader">Loading ...</div>}
        useWindow={false}
    >*/}
     <div className="row container">
	
        	{blocks}
    		</div>
    {/*</InfiniteScroll>
    */}
 
	
</div>

  }
}


export default withRouter(Home);