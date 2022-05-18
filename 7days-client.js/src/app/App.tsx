import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import AuthInit from './modules/auth/redux/AuthInit'

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthInit >
        <Outlet />
      </AuthInit>
    </Suspense>
  )
}

export {App}
