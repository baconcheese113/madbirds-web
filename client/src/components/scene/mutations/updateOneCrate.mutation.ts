import { gql } from '@apollo/client'

export const updateOneCrateMutation = gql`
  mutation updateOneCrate($data: CrateUpdateInput!, $where: CrateWhereUniqueInput!) {
    updateOneCrate(data: $data, where: $where) {
      id
      x
      y
    }
  }
`
