
import React from 'react';
import Scenes from './Scenes';
import { BrowserRouter, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="" component={Scenes} />
    </BrowserRouter>
  )
}

export default App;
