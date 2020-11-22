import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Layout } from './components/common'
import SceneEditor from './components/scene/SceneEditor'

export default function App() {
  return (
    <Layout flex align="center start">
      <BrowserRouter>
        <Route component={SceneEditor} path="" />
      </BrowserRouter>
    </Layout>
  )
}
