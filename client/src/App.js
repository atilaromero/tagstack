import React, { Component } from  'react';
import NavTop from './components/auth/NavTop'
import GoogleUser from './components/auth/GoogleUser'
import Data from './components/Data'
import Search from './components/Search'
import assert from 'assert'

import C3Chart from 'react-c3js';

const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
assert(REACT_APP_CLIENT_ID, 'REACT_APP_CLIENT_ID not set')

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      signedIn: false,
      query: "",
      tempquery: "",
    }
    this.userChanged = this.userChanged.bind(this)
    this.signedChanged = this.signedChanged.bind(this)
    this.updateData = this.updateData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  userChanged(user) {
    this.setState({user})
  }
  signedChanged(val) {
    this.setState({signedIn: val})
  }
  updateData(data){
    this.setState({data})
  }
  handleChange(prop){
    return e => {
      const r = {}
      r[prop] = e.target.value
      this.setState(r)
    }
  }
  handleSubmit(e){
    this.setState({ query:this.state.tempquery })
    e.preventDefault()
  }

  render() {
    return (
      <div className="App">
        <GoogleUser
          currentUser={this.userChanged}
          isSignedIn={this.signedChanged}
          client_id={REACT_APP_CLIENT_ID}
        />
        <NavTop signedIn={this.state.signedIn} user={this.state.user}/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <Data user={this.state.user} onData={this.updateData}/> */}
              <form onSubmit={this.handleSubmit}>
                <label>
                  Search:
                  <input type="text"
                    value={this.state.tempquery}
                    onChange={this.handleChange('tempquery')}
                  />
                  <input type="submit" value="Search"/>
                </label>
              </form>
              <Search
                user={this.state.user}
                onData={this.updateData}
                query={this.state.query}
              />
              state:{JSON.stringify(this.state)}
              {/* {(this.state.data) ?
                (<C3Chart data={this.state.data}/>)
                : (null)
              } */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
