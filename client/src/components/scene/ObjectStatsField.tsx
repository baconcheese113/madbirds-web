import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useClasses = makeStyles({
  textField: {
    color: '#000',
  },
})
type Props = {
  label: string,
  value: number | string,
  onChange: (value: string) => any,
}
export default function ObjectStatsField(props: Props) {
  const { value, onChange, ...otherProps } = props
  const classes = useClasses()
  const [curValue, setCurValue] = React.useState<string>(`${value}`)

  return (
    <TextField
      classes={{ root: classes.textField }}
      value={curValue}
      onBlur={() => onChange(curValue)}
      onChange={e => setCurValue(e.target.value)}
      {...otherProps}
    />
  )
}
