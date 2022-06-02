import { FC} from "react";
// import { useTranslation } from "react-i18next";
import { KTSVG } from '../../../../resources/helpers/components/KTSVG';
import { Content } from "../../Content";

import ChatList from './ChatList';

const ChatWrapper: FC = () => {
    return(
        <div className='card card-flush'>
          <div className='card-header pt-7' id='kt_chat_contacts_header'>
            <form className='w-100 position-relative' autoComplete='off'>
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y'
              />

              <input
                type='text'
                className='form-control form-control-solid px-15'
                name='search'
                placeholder='Search by username or email...'
              />
            </form>
          </div>
          <ChatList />
        </div>
    );
}

export default ChatWrapper;