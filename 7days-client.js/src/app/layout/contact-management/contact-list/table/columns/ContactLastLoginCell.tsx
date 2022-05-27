import {FC} from 'react'

type Props = {
  lastLogin?: Long
}

const ContactLastLoginCell: FC<Props> = ({lastLogin}) => (
  <div className='badge badge-light fw-bolder'>{lastLogin}</div>
)

export {ContactLastLoginCell}
