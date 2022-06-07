import React, {useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {useLayout} from '../layout/core'
import {DrawerComponent} from '../../resources/assets/ts/components/_DrawerComponent'

const Content: React.FC = ({children}) => {
  // const {classes} = useLayout()
  // const location = useLocation()
  // useEffect(() => {
  //   DrawerComponent.hideAll()
  // }, [location])

  return (
    <div id='kt_content_container' className="container">
      {children}
    </div>
  )
}

export {Content}
