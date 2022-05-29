/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
const ContactsListPagination = () => {
  const DUMMY_pagination = {
    "page": 1,
    "first_page_url": "/?page=1",
    "from": 1,
    "last_page": 3,
    "links": [{
      "url": null,
      "label": "&laquo; Previous",
      "active": false,
      "page": null
    }, {
      "url": "/?page=1",
      "label": "1",
      "active": true,
      "page": 1
    }, {
      "url": "/?page=2",
      "label": "2",
      "active": false,
      "page": 2
    }, {
      "url": "/?page=3",
      "label": "3",
      "active": false,
      "page": 3
    }, {
      "url": "/?page=2",
      "label": "Next &raquo;",
      "active": false,
      "page": 2
    }],
    "next_page_url": "/?page=2",
    "items_per_page": "10",
    "prev_page_url": null,
    "to": 10,
    "total": 21
  }
  //const pagination = useQueryResponsePagination()
  const pagination = DUMMY_pagination
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  console.log("pagination ====>>" + JSON.stringify(pagination));
  
  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return <p>this pagination</p>  
    }
    
    updateState({page, items_per_page:  10}) //pagination.items_per_page ||
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {pagination.links?.map((link) => (
              <li
                key={link.label}
                className={clsx('page-item', {
                  active: pagination.page === link.page,
                  disabled: isLoading,
                  previous: link.label === '&laquo; Previous',
                  next: link.label === 'Next &raquo;',
                })}
              >{console.log("this is page =>>>"+pagination.links)}
                <a
                  className='page-link'
                  onClick={() => updatePage(link.page)}
                  dangerouslySetInnerHTML={{__html: link.label}}
                  style={{cursor: 'pointer'}}
                />
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </div>
  )
}

export {ContactsListPagination}
