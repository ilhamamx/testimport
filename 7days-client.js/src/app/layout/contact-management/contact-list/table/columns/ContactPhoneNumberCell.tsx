import {FC} from 'react'

type Props = {
  phoneNumber?: string
}

const ContactPhoneNumberCell: FC<Props> = ({phoneNumber}) => (
  <div className='text-gray-800 mb-1'>{phoneNumber}</div> //text-hover-primary
)

export {ContactPhoneNumberCell}
