/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../resources/assets/ts/components";
import { ID, KTSVG, QUERIES } from "../../../../../../resources/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { deleteContact } from "../../core/_requests";
import { useTranslation } from "react-i18next";
import { useQueryRequest } from "../../core/QueryRequestProvider";

type Props = {
  id: ID;
};

const ContactActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { state, updateState } = useQueryRequest();
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id);
  };

  const deleteItem = useMutation(() => deleteContact(id), {
    
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      // queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
      updateState({sort:(state.sort === 'delete' ? 'asc' : 'delete' ), items_per_page: state.items_per_page, page: 1, action: "noAction"}) 
      // updateState({sort: 'delete', items_per_page: state.items_per_page, page: 1, action: "noAction"})
    },
  });

  return (
    <>
      {/* <a
        href="#"
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
        // role="button"
        //   id="dropdownMenuLink"
        //   data-bs-toggle="dropdown"
        //   aria-expanded="false"
      >
        {t("Contacts.Column.Actions")}
        <KTSVG
          path="/media/icons/duotune/arrows/arr072.svg"
          className="svg-icon-5 m-0"
        />
      </a>
      {/* begin::Menu */}
      {/* <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
        data-kt-menu="true"
      > */}
        {/* begin::Menu item */}
        {/* <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a>
        </div> */}
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {/* <div className="menu-item px-3"> */}
        {/* <a
          className="menu-link px-3"
          data-kt-users-table-filter="delete_row"
          onClick={async () => await deleteItem.mutateAsync()}
        >
          {t("Contacts.Menu.Delete")}
        </a> */}
        {/* </div> */}
        {/* end::Menu item */}
      {/* </div>
      end::Menu */} 

      <div className="dropdown">
        <a
          className="btn btn-light btn-active-light-primary btn-sm"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          // href="#"
          // className="btn btn-light btn-active-light-primary btn-sm"
          // data-kt-menu-trigger="click"
          // data-kt-menu-placement="bottom-end"
        >
          {t("Contacts.Column.Actions")}
        <KTSVG
          path="/media/icons/duotune/arrows/arr072.svg"
          className="svg-icon-5 m-0"
          />
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">          
          <li>
          <a
          // className="menu-link px-3"
          className="dropdown-item btn btn-light btn-active-light-primary btn-sm"
          data-kt-users-table-filter="delete_row"
          onClick={async () => await deleteItem.mutateAsync()}
        >
          {t("Contacts.Menu.Delete")}
        </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export { ContactActionsCell };
  function updateState(arg0: { sort: string; items_per_page: any; page: number; action: string; }) {
    throw new Error("Function not implemented.");
  }

