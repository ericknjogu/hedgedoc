/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useDarkModeState } from '../../../hooks/dark-mode/use-dark-mode-state'
import { cypressAttribute, cypressId } from '../../../utils/cypress-attribute'
import type { HistoryEntryWithOrigin } from '../../../api/history/types'
import styles from './history-card.module.scss'
import Link from 'next/link'
import React from 'react'
import { Badge, Card } from 'react-bootstrap'

interface HistoryCardProps {
  entry: HistoryEntryWithOrigin
  onRemoveEntryClick: (noteId: string) => void
  onDeleteNoteClick: (noteId: string, keepMedia: boolean) => void
}

/**
 * Renders a history entry as a card.
 *
 * @param entry The history entry.
 * @param onRemoveEntryClick Callback that is fired when the entry removal button was clicked.
 * @param onDeleteNoteClick Callback that is fired when the note deletion button was clicked.
 */
export const HistoryCard: React.FC<HistoryCardProps> = ({
  entry,
  onRemoveEntryClick,
  onDeleteNoteClick
}) => {
  const darkMode = useDarkModeState()

  return (
    <Card
      {...cypressId('history-card')}
      className={`${styles['history-card']} ${darkMode ? 'bg-dark' : ''} mb-3 mx-2`}>
      <Card.Body>
        <div className='d-flex justify-content-between align-items-center'>
          <Link href={`/n/${entry.name}`}>
            <span  className={styles['entry-title']}>
              {entry.name}
            </span>
          </Link>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={() => onRemoveEntryClick(entry.name)}
            >
              Remove
            </button>
            <button 
              className="btn btn-sm btn-danger" 
              onClick={() => onDeleteNoteClick(entry.name, false)}
            >
              Delete
            </button>
          </div>
        </div>
        {entry.language && (
          <div className="text-muted mt-2 small">
            Language: {entry.language}
          </div>
        )}
        {entry.blocks && (
          <div className="mt-2">
            {entry.blocks.map((block, index) => (
              <Badge key={index} className={'bg-secondary text-light me-1 mb-1'}>
                {block}
              </Badge>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
