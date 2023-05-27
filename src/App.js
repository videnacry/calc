import './App.css';

import "./index.css"
import FakeStatus from './fakeStatus'
import Screen from './screen'
import Buttons from './buttons'
import React from 'react';

import {calcInitialState, calcReducer, actions } from './calc';

function App() {
  const [state, dispatch] = React.useReducer(calcReducer, calcInitialState)
  
  return (
    <div className="App">
      <div className='calc'>
        <FakeStatus />
        <Screen history={state.history} operationString={state.operationString}/>
        <Buttons dispatch={dispatch} actions={actions}/>
      </div>
    </div>
  );
}

export default App;
