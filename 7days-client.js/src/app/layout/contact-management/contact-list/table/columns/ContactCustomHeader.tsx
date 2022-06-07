import clsx from 'clsx'
import {FC, PropsWithChildren, useMemo} from 'react'
import { useTranslation } from 'react-i18next'
import {HeaderProps} from 'react-table'
import { initialQueryState } from '../../../../../../resources/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {Contact} from '../../core/_models'

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<Contact>>
}
const ContactCustomHeader: FC<Props> = ({className, title, tableProps}) => {
  const { t } = useTranslation();
  const id = tableProps.column.id
  const {state, updateState} = useQueryRequest()

  const isSelectedForSorting = useMemo(() => {
    // console.log("is selected "+state.sort + " - " + id);
    return state.sort && state.sort === id
  }, [state, id])
  const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    //console.log("Table props :  "+ JSON.stringify(tableProps.data));
    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({sort: id, order: 'asc', items_per_page: state.items_per_page, page: 1, action: "noAction"})
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        updateState({sort: id, order: 'desc', items_per_page: state.items_per_page, page: 1, action: "noAction"})
        console.log("Table props :  "+ JSON.stringify(tableProps.data));
        return
      }

      // disable sort
      updateState({sort: undefined, order: undefined, items_per_page: state.items_per_page, page: 1, action: "noAction"})
    }
  }

  return (
    <th
      {...tableProps.column.getHeaderProps()}
      className={clsx(
        className,
        isSelectedForSorting && order !== undefined && `table-sort-${order}`
      )}
      style={{cursor: 'pointer'}}
      onClick={sortColumn}
    >
      {t(title!)}
    </th>
  )
}

export {ContactCustomHeader}
