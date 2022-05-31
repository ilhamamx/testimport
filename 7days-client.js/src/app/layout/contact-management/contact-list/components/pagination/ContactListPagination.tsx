/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import {
  useQueryResponseLoading,
  useQueryResponsePagination,
} from "../../core/QueryResponseProvider";
import { useQueryRequest } from "../../core/QueryRequestProvider";
import { useState } from "react";
import {fetchCountCustomers } from '../../../../../../db'
import { count } from "console";
const ContactsListPagination = () => {
  const DUMMY_pagination = {
    page: 1,
    first_page_url: "/?page=1",
    from: 1,
    last_page: 3,
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
        page: null,
      },
      {
        url: "/?page=1",
        label: "1",
        active: true,
        page: 1,
      },
      {
        url: "/?page=2",
        label: "Next &raquo;",
        active: false,
        page: 2,
      },
    ],
    next_page_url: "/?page=2",
    items_per_page: "10",
    prev_page_url: null,
    to: 10,
    total: 21,
  };
  //const pagination = useQueryResponsePagination()
  const pagination = DUMMY_pagination;
  const isLoading = useQueryResponseLoading();
  const { state, updateState } = useQueryRequest();
  const [count, setCount] = useState(0)
  const [value, setValue ] = useState(10)
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(10)

  // useEffect(() => {
  //   if ( !== updatedQuery) {
  //     setQuery(updatedQuery)
  //   }
  // }, [updatedQuery])
  //console.log("pagination ====>>" + JSON.stringify(pagination));

  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return <p>this is pagination</p>;
    }

    updateState({ page, items_per_page:  10, action: 'next', lastId: "1" }); //pagination.items_per_page ||
  };

  fetchCountCustomers().then((customerCount) => {
    //console.log("COunt  => "+ customerCount); 
    setCount(customerCount);    
    
    return customerCount
  });
  

  console.log("customer count ======== > "+count);

  let maxPage = count / state.items_per_page;
  console.log("max page ==>> " + maxPage);
  
  // const setItemPerPage = () => {
  //   let {name, value} = e.target;
  //   setValue(value)
  //   updateState({ items_per_page:  value})
  // }

  // const onChangeHandler = (change) => {
  //   setTotalItems = change
  //   updateState({ items_per_page:  totalItems})
  // };

  const PrevItemPage = () => {    
    if (page <= 1) {
      return
    }

    let pages = page - 1
    setPage(pages)
        
  }

  const NextItemPage = () => {
    if (page >= Math.ceil(maxPage)) {
    } else {   
      updateState({ action:  "next"})   
      let pages = page + 1
      setPage(pages)
    }
  }

  const showPage = () => {
    for (let i = 1; i < Math.ceil(maxPage); i++) {
      return <li className="page-item"><p className="page-link me-3">{i}</p></li>
    } 
  }

  return (
    <div className="row">
      <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
        <div
          v-if="enableItemsPerPageDropdown"
          className="dataTables_length"
          id="kt_customers_table_length"
        >
          <label
            ><select
              name="kt_customers_table_length"
              className="form-select form-select-sm form-select-solid"
              value={totalItems}
              //onChange={handleChange}
            >
              <option value="10">10</option>
              {/* <option value="25">25</option> */}
              <option value="50">50</option>
              <option value="100">100</option>
            </select></label
          >
        </div>
      </div>
      <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
        <div id="kt_table_users_paginate">
          <ul className="pagination">
            {/* {pagination.links?.map((link) => (
              <li
                key={link.label}
                className={clsx("page-item", {
                  active: pagination.page === link.page,
                  disabled: isLoading,
                  previous: link.label === "&laquo; Previous",
                  next: link.label === "Next &raquo;",
                })}
              >
                <a
                  className="page-link"
                  onClick={() => updatePage(link.page)}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))} */}

            <li className="page-item"><a className="page-link me-3" style={{ cursor: "pointer" }} onClick={PrevItemPage}>Previous</a></li>
            {showPage()}
            {/* <li className="page-item"><p className="page-link me-3">{page}</p></li> */}
            <li className="page-item"><a className="page-link ms-3" style={{ cursor: "pointer" }} onClick={NextItemPage}>Next</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { ContactsListPagination };
