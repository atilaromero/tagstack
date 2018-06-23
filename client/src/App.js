import React, { Component } from  'react';
import assert from 'assert'

import NavTop from './components/auth/NavTop'
import GoogleUser from './components/auth/GoogleUser'
import TabStack from './components/TabStack'
import { DocTableContainer } from './components/DocTable'

import './App.css'

const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
assert(REACT_APP_CLIENT_ID, 'REACT_APP_CLIENT_ID not set')

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      signedIn: false,
    }
    this.userChanged = this.userChanged.bind(this)
    this.signedChanged = this.signedChanged.bind(this)
    this.updateData = this.updateData.bind(this)
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
              <DocTableContainer/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TabStack/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
