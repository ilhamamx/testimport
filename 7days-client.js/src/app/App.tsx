import {Suspense} from 'react'
import {Outlet, Router} from 'react-router-dom'
import AuthInit from './modules/auth/redux/AuthInit'
import { ToggleComponent, ScrollTopComponent } from '../resources/assets/ts/components'


const App = () => {

  const pluginsInitialization = () => {
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
    }, 500)
  }

  pluginsInitialization();
  return (
    // <Router location={''} navigator={}>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthInit >
          <Outlet />
        </AuthInit>
      </Suspense>
    // </Router>
  )
}

export {App}
