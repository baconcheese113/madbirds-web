import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress'
import { GetScenesList, GetScenesListVariables } from "./__generated__/GetScenesList";
import { Layout } from './components/common';

export const SCENE_DATA = gql`
  fragment SceneData on Scene {
    __typename
    id
    levelNumber
    crates {
      id
      x
      y
      rotation
    }
  }
`
interface SceneProps extends RouteComponentProps { }
export default function Scenes(_props: SceneProps) {
  const { data, loading, error } = useQuery<GetScenesList, GetScenesListVariables>(gql`
  query GetScenesList($first: Int) {
    scenes(first: $first) {
      ...SceneData
    }
  }
  ${SCENE_DATA}
`, { variables: { first: 10 } })


  if (loading) return <CircularProgress />
  if (error) return <p>ERROR</p>
  if (!data) return <p>Not Found</p>

  return (
    <>
      {data.scenes.map(scene => (
        <Layout column key={scene.id}>
          <p>{`Scene id: ${scene.id} and level #: ${scene.levelNumber}`}</p>
          {scene.crates.map(crate => (
            <p key={crate.id}>{`Crate id: ${crate.id} at x: ${crate.x}, y: ${crate.y}, rotation: ${crate.rotation}`}</p>
          ))}
        </Layout>
      ))}
    </>
  )
}