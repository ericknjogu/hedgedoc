'use client'

import React, { useEffect, useState } from 'react'
import { LandingLayout } from '../../../components/landing-layout/landing-layout'
import { HistoryToolbarStateContextProvider } from '../../../components/history-page/history-toolbar/toolbar-context/history-toolbar-state-context-provider'
import { Row } from 'react-bootstrap'
import { HistoryToolbar } from '../../../components/history-page/history-toolbar/history-toolbar'
import { HistoryContent } from '../../../components/history-page/history-content/history-content'
import type { HistoryEntryWithOrigin } from '../../../api/history/types'

export default function Page() {
  const [entries, setEntries] = useState<HistoryEntryWithOrigin[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/private/proxy')
        
        const data = await response.json()
        setEntries(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch history entries')
        console.error('Error fetching history entries:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  return (
    <LandingLayout>
      <HistoryToolbarStateContextProvider>
        <Row className={'justify-content-center mt-5 mb-3'}>
          <HistoryToolbar />
        </Row>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <HistoryContent 
            entries={entries}
            pageIndex={pageIndex}
            onLastPageIndexChange={setPageIndex}
          />
        )}
      </HistoryToolbarStateContextProvider>
    </LandingLayout>
  )
}
