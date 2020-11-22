import { gql } from '@apollo/client'

export const updateOneExplosiveCrateMutation = gql`
  mutation updateOneExplosiveCrate($data: ExplosiveCrateUpdateInput!, $where: ExplosiveCrateWhereUniqueInput!) {
    updateOneExplosiveCrate(data: $data, where: $where) {
      id
      x
      y
      rotation
      explosionRadius
      explosionForce
      hitSensitivity
      chainReactionRadius
      onlyPlayerCanTrigger
    }
  }
`
