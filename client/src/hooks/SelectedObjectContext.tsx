import * as React from 'react'

type SceneObjectType = 'crate' | 'explosiveCrate' | 'enemy' | 'platform'
type SelectedObjectType = { id: number, type: SceneObjectType }

type ContextType = {
  selectedObject?: SelectedObjectType,
  setSelectedObject: (selectedObject?: SelectedObjectType) => any,
}
const SelectedObjectContext = React.createContext<ContextType>({
  selectedObject: undefined,
  setSelectedObject: () => {},
})

export function useSelectedObject() {
  return React.useContext(SelectedObjectContext)
}

type Props = { children: React.ReactNode }
export function SelectedObjectProvider(props: Props) {
  const [selectedObject, setSelectedObject] = React.useState<SelectedObjectType>()

  return (
    <SelectedObjectContext.Provider value={{ selectedObject, setSelectedObject }}>
      {props.children}
    </SelectedObjectContext.Provider>
  )
}
