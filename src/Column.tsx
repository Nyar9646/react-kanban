import React, { useState } from "react"
import styled from "styled-components"
import * as color from './color'
import { Card } from "./Card"
import { PlusIcon } from "./icon"
import { InputForm as _InputForm } from "./InputForm"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 355px;
  height: 100%;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  background-color: ${color.LightSilver};

  > :not(:last-child) {
    flex-shrink: 0;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
`
const CountBadge = styled.div`
  margin-right: 8px;
  border-radius: 20px;
  padding: 2px 6px;
  color: ${color.Black};
  background-color: ${color.Silver};
  font-size: 12px;
  line-height: 1;
`
const ColumnName = styled.div`
  color: ${color.Black};
  font-size: 14px;
  font-weight: bold;
`
const AddButton = styled.button.attrs({
  type: 'button',
  children: <PlusIcon />,
})`
  margin-left: auto;
  color: ${color.Black};

  :hover {
    color: ${color.Blue};
  }
`
const InputForm = styled(_InputForm)`
  padding: 8px;
`
const ResultCount = styled.div`
  color: ${color.Black};
  font-size: 12px;
  text-align: center;
`
const VerticalScroll = styled.div`
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  flex: 1 1 auto;

  > :not(:first-child) {
    margin-top: 8px;
  }
`

export function Column({
  title,
  // ＊引数に別名をつける。関数コンポーネント内で元の名前を使うため
  filterValue: rawFilterValue,
  cards: rawCards,
}: {
  title?: string,
  filterValue?: string,
  cards: {
    id: string,
    text?: string,
  }[]
}) {
  // 文字列の前後の空白を除く
  const filterValue = rawFilterValue?.trim()
  // 英字は全角半角共に小文字に変換し、空白文字(繰り返し含む)で区切る。検索の入力がなければ空
  const keywords = filterValue?.toLowerCase().split(/\s+/g) ?? []

  // every : 配列の全要素に対して、テスト内容に沿うか
  // cards 配列の text の内、検索条件を含む cards を取得
  const cards = rawCards.filter(({text}) => keywords?.every(w => text?.toLowerCase().includes(w)))

  const totalCount = rawCards.length
  const [text, setText] = useState('')
  const [inputMode, setInputMode] = useState(false)

  const toggleInput = () => setInputMode(v => !v)
  const confirmInput = () => setText('')
  const canselInput = () => setInputMode(false)

  return (
    <Container>
      <Header>
        <CountBadge>{totalCount}</CountBadge>
        <ColumnName>{title}</ColumnName>
        <AddButton onClick={toggleInput} />
      </Header>

      {inputMode && (
        // ＊text を引数として渡すことで、inputMode でフォームを非表示にしても値が残る
        <InputForm
          value={text}
          onChange={setText}
          onConfirm={confirmInput}
          onCancel={canselInput}
        />
      )}

      {filterValue && <ResultCount>{cards.length} results.</ResultCount>}

      <VerticalScroll>
        {cards.map(({id, text}) => (
          <Card key={id} text={text} />
        ))}
      </VerticalScroll>
    </Container>
  )
}
