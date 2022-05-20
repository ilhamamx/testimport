/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import '../../../styles/css/color.css'
import {DropdownMenuItem} from './DropdownMenuItem'

const DropdownMenu: FC = () => {

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6'
      data-kt-menu='true'
      style={{marginTop: "20px", backgroundColor: "#A1DDF9"}}
    >
       <DropdownMenuItem
        to='/unhandlechat'
        title='Customer in Queue'
        bbcount={10}
        bbcolor='danger'
      />

      <DropdownMenuItem
        to='/chat'
        title='Handled Customer'
        bbcount={10}
        bbcolor='success'
      />

      <DropdownMenuItem
        to='/contacts'
        title='Contacts'
      />    

      <DropdownMenuItem
        to='/about'
        title='About'
      />    

      <DropdownMenuItem
        to='/faq'
        title='FAQ'
      />    
    </div>
  )
}

export {DropdownMenu}
