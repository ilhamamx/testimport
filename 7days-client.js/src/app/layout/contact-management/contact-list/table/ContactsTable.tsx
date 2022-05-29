import { useMemo } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from '../table/columns/CustomHeaderColumn'
import { CustomRow } from '../table/columns/CustomRow'
import { useQueryResponseData, useQueryResponseLoading } from '../core/QueryResponseProvider'
import { contactsColumns } from './columns/_columns'
import { Contact } from '../core/_models'
import { ContactsListLoading } from '../components/loading/ContactListLoading'
import { ContactsListPagination } from '../components/pagination/ContactListPagination'
import { KTCardBody } from '../../../../../resources/helpers'
import { fetchCustomers } from '../../../../../actions'

const ContactsTable = () => {
  const contacts = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => contacts, [contacts])
  const columns = useMemo(() => contactsColumns, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Contact>) => (
                
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Contact>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p>pagination</p>
      <ContactsListPagination />
      {isLoading && <ContactsListLoading />}
    </KTCardBody>
  )
}

export { ContactsTable }
