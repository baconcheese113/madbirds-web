import { gql } from '@apollo/client'

export const updateOneEnemyMutation = gql`
  mutation updateOneEnemy($data: EnemyUpdateInput!, $where: EnemyWhereUniqueInput!) {
    updateOneEnemy(data: $data, where: $where) {
      id
      x
      y
      rotation
    }
  }
`
