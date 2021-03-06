import {Suspense} from 'react'
import {Outlet, Router} from 'react-router-dom'
import AuthInit from './modules/auth/redux/AuthInit'
import { 
  MenuComponent,
  DrawerComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '../resources/assets/ts/components'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)


const App = () => {

  const pluginsInitialization = () => {
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
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
