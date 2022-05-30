import {FC} from 'react'

type Props = {
  email?: string
}

const ContactEmailCell: FC<Props> = ({email}) => (
  // <div className='badge badge-light fw-bolder'>{email}</div>
  <div className='text-gray-650 mb-1'>{email}</div>
)

export {ContactEmailCell}
