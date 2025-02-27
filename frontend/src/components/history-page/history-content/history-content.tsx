import React, { useMemo } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { PagerPagination } from '../../common/pagination/pager-pagination'
import { HistoryTable } from '../history-table/history-table'
import { HistoryCardList } from '../history-card/history-card-list'
import { useHistoryToolbarState } from '../history-toolbar/toolbar-context/use-history-toolbar-state'
import { ViewStateEnum } from '../history-toolbar/history-toolbar'

import type { HistoryEntryWithOrigin } from '../../../api/history/types'

interface HistoryContentProps {
  entries: HistoryEntryWithOrigin[]
  pageIndex: number
  onLastPageIndexChange: (lastPageIndex: number) => void
}

export const HistoryContent: React.FC<HistoryContentProps> = ({ entries, pageIndex, onLastPageIndexChange }) => {
  const { t } = useTranslation()
  const [historyToolbarState] = useHistoryToolbarState()

  // const entriesToShow = useMemo(() => sortAndFilterEntries(entries, historyToolbarState), [
  //   entries,
  //   historyToolbarState,
  // ]);

  const historyContent = useMemo(() => {
    switch (historyToolbarState.viewState) {
      case ViewStateEnum.TABLE:
        return (
          <HistoryTable
            entries={entries}
            onPinClick={() => {}}
            onRemoveEntryClick={() => {}}
            onDeleteNoteClick={() => {}}
            pageIndex={pageIndex}
            onLastPageIndexChange={onLastPageIndexChange}
          />
        )
      case ViewStateEnum.CARD:
        return (
          <HistoryCardList
            entries={entries}
            
            onRemoveEntryClick={() => {}}
            onDeleteNoteClick={() => {}}
            pageIndex={pageIndex}
            onLastPageIndexChange={onLastPageIndexChange}
          />
        )
      default:
        return null
    }
  }, [entries, historyToolbarState.viewState, pageIndex, onLastPageIndexChange])

  if (entries.length === 0) {
    return (
      <Row className={'justify-content-center'}>
        <Alert variant={'secondary'}>
          <Trans i18nKey={'landing.history.noHistory'} />
        </Alert>
      </Row>
    )
  }

  return (
    <>
      {historyContent}
      <Row>
        <Col className={'justify-content-center d-flex'}>
          <PagerPagination
            numberOfPageButtonsToShowAfterAndBeforeCurrent={2}
            lastPageIndex={0} // Update this dynamically
            onPageChange={() => {}}
          />
        </Col>
      </Row>
    </>
  )
}
