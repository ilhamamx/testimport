/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import {
  useQueryResponseLoading,
  useQueryResponsePagination,
} from "../../core/QueryResponseProvider";
import { useQueryRequest } from "../../core/QueryRequestProvider";
import { useState } from "react";
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
  const { updateState } = useQueryRequest();
  //console.log("pagination ====>>" + JSON.stringify(pagination));

  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return <p>this is pagination</p>;
    }

    updateState({ page, items_per_page:  10, action: 'next', lastId: "1" }); //pagination.items_per_page ||
  };
  const [value, setValue ] = useState(10)
  const [page, setPage] = useState(1)
  const pageItem10 = () => {
    setValue(10)
    updateState({ items_per_page:  10})
  }

  const pageItem50 = () => {
    setValue(50)
    updateState({ items_per_page:  50})
  }

  const pageItem100 = () => {
    setValue(100)
    updateState({ items_per_page:  100})
  }

  const PrevItemPage = () => {
    updateState({ action:  "prev"})
    if (page <= 1) {
      return
    }
    let pages = page - 1
    setPage(pages)
        
  }

  const NextItemPage = () => {
    updateState({ action:  "next"})
    let pages = page + 1
    setPage(pages)
  }
  return (
    <div className="row">
      <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
        {/* <div className="dropdown"> */}
        
        <div className="dropdown">
          <button
            className="btn btn-primary btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {value}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#" onClick={pageItem10}>
                10
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={pageItem50}>
                50
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={pageItem100}>
                100
              </a>
            </li>
          </ul>
        </div>
        {/* </div> */}
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
            <li className="page-item"><p className="page-link me-3">{page}</p></li>
            <li className="page-item"><a className="page-link ms-3" style={{ cursor: "pointer" }} onClick={NextItemPage}>Next</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { ContactsListPagination };
