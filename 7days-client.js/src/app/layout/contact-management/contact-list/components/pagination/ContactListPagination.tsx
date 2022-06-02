/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  useQueryResponseLoading,
  useQueryResponsePagination,
} from "../../core/QueryResponseProvider";
import { useQueryRequest } from "../../core/QueryRequestProvider";
import { fetchCountCustomers } from "../../../../../../db";
import { count } from "console";

const ContactsListPagination = () => {
  const isLoading = useQueryResponseLoading();
  const { state, updateState } = useQueryRequest();
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(10);
  // const [maxPage, setMaxPage] = useState(10)

  useEffect(() => {
    setPage(1);
    updateState({ items_per_page: totalItems, action: "noAction", page: 1 });
  }, [totalItems]);

  useEffect(() => {
    setPage(1);
  }, [state.sort, state.search]);

  fetchCountCustomers().then((customerCount) => {
    setCount(customerCount);
    return customerCount;
  });

  let maxPage = Math.ceil(count / state.items_per_page);
  console.log("max page ==>> " + maxPage);

  const PrevItemPage = () => {
    if (page <= 1) {
      return;
    }
    let pages = page - 1;
    setPage(pages);
    updateState({ action: "prev", page: page, items_per_page: totalItems });
  };

  const NextItemPage = () => {
    if (page >= maxPage) {
      return;
    } else {
      let pages = page + 1;
      setPage(pages);
      updateState({ action: "next", page: page, items_per_page: totalItems });
    }
  };

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
        <div
          v-if="enableItemsPerPageDropdown"
          className="dataTables_length"
          id="kt_customers_table_length"
        >
          <label>
            <select
              name="kt_customers_table_length"
              className="form-select form-select-sm form-select-solid"
              // value={totalItems}
              defaultValue={10}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setTotalItems(parseInt(selectedValue));
              }}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
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

            {page <= 1 ? (
              <li className="page-item disabled">
                <a className="page-link " style={{ cursor: "pointer" }}>
                  « Previous
                </a>
              </li>
            ) : (
              <li className="page-item ">
                <a
                  className="page-link "
                  style={{ cursor: "pointer" }}
                  onClick={PrevItemPage}
                >
                  « Previous
                </a>
              </li>
            )}

            {[...Array(Math.ceil(maxPage))].map((e, i) => {
              if (i + 1 == page) {
                return (
                  <li key={i + 1} className="page-item active">
                    <p className="page-link me-3" key={i + 1}>
                      {i + 1}
                    </p>
                  </li>
                );
              }
              return (
                <li key={i + 1} className="page-item">
                  <p className="page-link me-3 " key={i + 1}>
                    {i + 1}
                  </p>
                </li>
              );
            })}
            {/* <li className="page-item"><p className="page-link me-3">{page}</p></li> */}
            {page === Math.ceil(maxPage) ? (
              <li className="page-item disabled">
                <a className="page-link " style={{ cursor: "pointer" }}>
                  Next »
                </a>
              </li>
            ) : (
              <li className="page-item ">
                <a
                  className="page-link "
                  style={{ cursor: "pointer" }}
                  onClick={NextItemPage}
                >
                  Next »
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { ContactsListPagination };
