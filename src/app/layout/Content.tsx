import React from 'react'

const Content: React.FC = ({children}) => {
  // const {classes} = useLayout()
  // const location = useLocation()
  // useEffect(() => {
  //   DrawerComponent.hideAll()
  // }, [location])

  return (
    <div id='kt_content_container'>
      {children}
    </div>
  )
}

export {Content}
