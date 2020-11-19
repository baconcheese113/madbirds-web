
import React from 'react';
import Scenes from './Scenes';
import { BrowserRouter, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Layout } from './components/common';
import SceneEditor from './components/scene/SceneEditor';

const useClasses = makeStyles({
  root: {
    height: '100vh',
  }
})
const App: React.FC = () => {
  const classes = useClasses();

  return (
    <Layout flex align="center start">
      <BrowserRouter>
        <Route path="" component={SceneEditor} />
      </BrowserRouter>
    </Layout>
  )
}

export default App;
