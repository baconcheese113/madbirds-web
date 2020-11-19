import * as React from 'react'

type Props = {
  isSelected: boolean,
}
export default function SceneObject(props: Props) {
  const { isSelected } = props;

  return (
    <rect x="50" y="20" width="50" height="50" style={isSelected ? { strokeWidth:3,stroke:'rgb(200,200,200)'} : undefined} />
  )
}

SceneObject.defaultProps = {
  isSelected: false
}