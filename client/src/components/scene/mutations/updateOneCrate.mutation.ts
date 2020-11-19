import { gql } from "@apollo/client";

export const updateOneCrate = gql`
  mutation updateOneCrate($data: CrateUpdateInput!, $where: CrateWhereUniqueInput!) {
    updateOneCrate(data: $data, where: $where) {
      id
      x
      y
    }
  }
`