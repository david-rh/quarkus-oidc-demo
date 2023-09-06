import React, {Component} from 'react';

import Unauthenticated from './unauthenticated';
import Authenticated from './athenticated';
import WelcomeAnon from './WelcomeAnon';
import UserService from '../services/UserService';
import WelcomeUser from './WelcomeUser';

class App extends Component {
  
  componentDidMount() {
   // TODO
  }

  render () {
    console.log("Is authenticated: " + UserService.isLoggedIn());
    return (
      <div>
      <Authenticated>
        <WelcomeUser />
      </Authenticated>
      <Unauthenticated >
        <WelcomeAnon />
      </Unauthenticated>
      </div>

    );
  }
}

export default App;