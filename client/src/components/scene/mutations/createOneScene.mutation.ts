import { gql } from '@apollo/client'

export const createOneSceneMutation = gql`
  mutation createOneScene($data: SceneCreateInput!) {
    createOneScene(data: $data) {
      id
      levelNumber
    }
  }
`
