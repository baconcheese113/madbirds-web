import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from "react-router";
import { GetScenesList, GetScenesListVariables } from "./__generated__/GetScenesList";

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
interface SceneProps extends RouteComponentProps {}
const Scenes: React.FC<SceneProps> = () => {
  const { data, loading, error } = useQuery<GetScenesList, GetScenesListVariables>(GET_SCENES, { variables: { first: 10 }})


  if(loading) return <div>Loading</div>
  if(error) return <p>ERROR</p>
  if(!data) return <p>Not Found</p>

  return (
    <>
      {data.scenes.map(scene => (
        <div key={scene.id}>
          <p>{`Scene id: ${scene.id} and level #: ${scene.levelNumber}`}</p>
          {scene.crates.map(crate => (
            <p key={crate.id}>{`Crate id: ${crate.id} at x: ${crate.x}, y: ${crate.y}, rotation: ${crate.rotation}`}</p>
          ))}
        </div>
      ))}
    </>
  )
}

export const GET_SCENES = gql`
  query GetScenesList($first: Int) {
    scenes(first: $first) {
      ...SceneData
    }
  }
  ${SCENE_DATA}
`
export default Scenes