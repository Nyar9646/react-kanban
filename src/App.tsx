import React, { useState } from "react"
import styled from "styled-components"
import produce from "immer"
import { Header as _Header } from "./views/pages/Header"
import { Column } from "./views/pages/Column"
import { DeleteDialog } from "./views/components/DeleteDialog"
import { Overlay as _Overlay } from "./views/components/Overlay"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`
const Header = styled(_Header)`
  flex-shrink: 0;
`
const MainArea = styled.div`
  height: 100%;
  padding: 16px 0;
  overflow-y: auto;
`
const HorizontalScroll = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto;

  > * {
    margin-left: 16px;
    flex-shrink: 0;
  }

  ::after {
    display: block;
    flex: 0 0 16px;
    content: '';
  }
`
const Overlay = styled(_Overlay)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export function App() {
  const [filterValue, setFilterValue] = useState('')
  const [deletingCardId, setDeletingCardId] = useState<string | undefined>(undefined)

  // cards.id は全 column 合わせて一意
  const [columns, setColumns] = useState([
    {
      id: 'A',
      title: 'TODO',
      cards: [
        {id: '1', text: '朝食をとる🍞'},
        {id: '2', text: 'SNSをチェックする🐦'},
        {id: '3', text: '布団に入る (:3[___]'},
      ]
    },
    {
      id: 'B',
      title: 'Doing',
      cards: [
        {id: '4', text: '顔を洗う👐！'},
        {id: '5', text: '歯を磨く🦷！'},
      ]
    },
    {
      id: 'C',
      title: 'Waiting',
      cards: []
    },
    {
      id: 'D',
      title: 'Done',
      cards: [
        {id: '6', text: '布団から出る (:3っ)っ -=三[＿＿]'},
      ]
    }
  ])

  // ＊ string型 の useState は初期値として unefined 推奨
  const [draggingCardId, setDraggingCardId] = useState<string | undefined>(
    undefined,
  )

  const deleteCard = () => {
    const cardId = deletingCardId
    if (!cardId) return

    setDeletingCardId(undefined)

    type Columns = typeof columns

    setColumns(
      produce((columns: Columns) => {
        const column = columns.find(col => col.cards.some(c => c.id === cardId))
        if (!column) return

        column.cards = column.cards.filter(c => c.id !== cardId)
      })
    )
  }

  const dropCardTo = (toId: string) => {
    const fromId = draggingCardId
    if (!fromId) return

    setDraggingCardId(undefined)

    if (fromId === toId) return

    type Columns = typeof columns

    setColumns(
      produce((columns: Columns) => {
        const card = columns
          .flatMap(col => col.cards)
          .find(c => c.id === fromId)

        if (!card) return

        const fromColumn = columns.find(col => col.cards.some(c => c.id === fromId))
        if (!fromColumn) return

        fromColumn.cards = fromColumn.cards.filter(c => c.id !== fromId)

        const toColumn = columns.find(col => col.id === toId || col.cards.some(c => c.id === toId))
        if (!toColumn) return

        let index = toColumn.cards.findIndex(c => c.id === toId)

        if (index < 0) {
          index = toColumn.cards.length
        }

        toColumn.cards.splice(index, 0, card)
      })
    )
  }

  return (
    <Container>
      <Header filterValue={filterValue} onFilterChange={setFilterValue} />

      <MainArea>
        <HorizontalScroll>
          {columns.map(({ id: columnId, title, cards }) => (
            <Column
              key={columnId}
              title={title}
              filterValue={filterValue}
              cards={cards}
              onCardDragStart={setDraggingCardId}
              onCardDrop={entered => dropCardTo(entered ?? columnId)}
              onCardDeleteClick={setDeletingCardId}
            />
          ))}
        </HorizontalScroll>
      </MainArea>

      {deletingCardId && (
        <Overlay onClick={() => setDeletingCardId(undefined)} >
          <DeleteDialog
            onConfirm={deleteCard}
            onCancel={() => setDeletingCardId(undefined)}
          />
        </Overlay>
      )}
    </Container>
  )
}
