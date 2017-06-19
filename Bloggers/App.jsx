import React from 'react';
import SiteHeader from "./common/header";
import Leftside from "./common/leftPanel";

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { data: [] }
	}
	
	loadData() {
		fetch('blogdata.json')
			.then(response => response.json())
			.then(data => {
				this.setState({data: data })
		})
			.catch(err => console.error(this.props.url, err.toString()))
	}
	
	signOrder(id) {
      
		let ids = [
		{ 'orderId': id }
		];
		console.log(ids)
		fetch('example.com/api/orders/unsigned', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(ids)
		})
		
	}
	
	componentDidMount() {
		this.loadData()
	}
	
  render() {
    return ( <div>
        <div className="row">
         <Leftside />
         </div>
         <div className="row">
        { this.state.data.map((item, i) => {
			
				return ( <div className="col s12 m9 l5"><div className="card-panel" onClick={this.signOrder(item.Name)}>
                  Name:  <span>{item.name}</span><br/>
				Description:	<span>{item.description}</span><br/>
				Details	<span>{item.detailed}</span><br/>
					     <button onClick = {this.signOrder(item.name)}>CLICK</button>
                    </div></div>)
			
        })
      }
    </div>
      </div>)

  }
}


export default App;