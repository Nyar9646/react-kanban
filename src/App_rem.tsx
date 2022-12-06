import React, { useState } from "react"
import styled from "styled-components"
import { Header as _Header } from "./views/pages/Header"
import { Column } from "./views/pages/Column"

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

export function App() {
  const [filterValue, setFilterValue] = useState('')

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

  const dropCardTo = (toId: string) => {
    const fromId = draggingCardId
    if (!fromId) return

    setDraggingCardId(undefined)

    if (fromId === toId) return

    // ＊ イミュータブルな値の操作
    setColumns(columns => {
      // ＊ flatMap
      //  columns.map >> [[card, card], [card]] ... [[TODO], [Doing]]
      //  columns.flatMap >> 配列を一段浅くした配列を返す。[card, card, card]
      // 移動した card を、1階層の配列として取得
      const card = columns.flatMap(col => col.cards).find(c => c.id === fromId)

      if (!card) {
        return columns
      }

      return columns.map(column => {
        let newColumn = column

        // ＊ some : 配列で1つ以上の要素が () 内の検査に当てはまるか

        // この column で、移動した card がある場合、移動した card 以外を取得
        if (newColumn.cards.some(c => c.id === fromId)) {
          // ＊ ネスト配列の、削除の仕方
          newColumn = {
            ...newColumn,
            cards: newColumn.cards.filter(c => c.id !== fromId),
          }
        }

        // 列の末尾に移動
        // ???
        if (newColumn.id === toId) {
          // ＊ ネスト階層の配列の、追加の仕方
          newColumn = {
            ...newColumn,
            cards: [...newColumn.cards, card],
          }
        }
        // 列の末尾以外に移動
        else if (newColumn.cards.some(c => c.id === toId)) {
          newColumn = {
            ...newColumn,
            cards : newColumn.cards.flatMap(c => c.id === toId ? [card, c] : [c]),
          }
        }

        return newColumn
      })
    })
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
              onCardDragStart={cardId => setDraggingCardId(cardId)}

              // ???
              onCardDrop={entered => dropCardTo(entered ?? columnId)}
            />
          ))}
        </HorizontalScroll>
      </MainArea>
    </Container>
  )
}
