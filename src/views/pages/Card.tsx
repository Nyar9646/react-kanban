import React, { useState } from "react"
import styled from "styled-components"
import * as color from '../../utils/color'
import { CheckIcon as _CheckIcon, TrashIcon } from "../../style/icon"
import { useDragAutoLeave } from "../../hooks/useListDrag"

const Container = styled.div.attrs({
  draggable: true
})`
  position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`
const CheckIcon = styled(_CheckIcon)`
  position: absolute;
  top: 12px;
  left: 8px;
  color: ${color.Green};
`
// ＊ <DeleteButton /> = <button type="button"><TrashIcon /></button>
const DeleteButton = styled.button.attrs({
  type: 'button',
  children: <TrashIcon />,
})`
  position: absolute;
  top: 12px;
  right: 8px;
  font-size: 14px;
  color: ${color.Gray};

  :hover {
    color: ${color.Red};
  }
`
const Text = styled.span`
  color: ${color.Black};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`
const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: ${color.Blue};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`

Card.DropArea = DropArea

export function Card({
  text,
  onDragStart,
  onDragEnd,
}: {
  text?: string,
  onDragStart?(): void,
  onDragEnd?(): void,
}) {
  const [drag, setDrag] = useState(false)

  return (
    <Container
      // opacity : 要素の不透明度
      style={{ opacity: drag ? 0.5 : undefined }}
      onDragStart={() => {
        onDragStart?.()
        setDrag(true)
      }}
      onDragEnd={() => {
        onDragEnd?.()
        setDrag(false)
      }}
    >
      <CheckIcon />

      {/* 'https://' があれば text の文字列を区切り、Link とする。切り分けると i が 2 になる */}
      {text?.split(/(https:\/\/\S+)/g).map((fragment, i) =>
        i % 2 === 0 ? (
          <Text key={i}>{fragment}</Text>
        ) : (
          <Link key={i} href={fragment}>{fragment}</Link>
        )
      )}

      <DeleteButton />
    </Container>
  )
}

/**
 * DropAreaContainer
 *  Card のドラッグ可能なエリア。解説なし...
 */
const DropAreaContainer = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`
const DropAreaIndicator = styled.div`
  height: 40px;
  border: dashed 3px ${color.Gray};
  border-radius: 6px;
  transition: all 50ms ease-out;
`

function DropArea({
  disabled,
  onDrop,
  children,
  className,
  style,
} : {
  disabled?: boolean,
  onDrop?(): void,
  children?: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
}) {
  const [isTarget, setIsTarget] = useState(false)
  const [dragOver, onDragOver] = useDragAutoLeave()
  const visible = !disabled && isTarget

  return (
    <DropAreaContainer
      style={style}
      className={className}

      // onDragOver : 要素または選択されたテキストが、妥当なドロップターゲットの上にある時に数百ms感覚で発生
      onDragOver={e => {
        if (disabled) return

        // イベントの挙動の停止 < ???
        e.preventDefault()

        onDragOver(() => setIsTarget(false))
      }}
      // onDragEnter : マウスのポインタが、ドラッグしながら最初に要素上を移動した時のイベント
      onDragEnter={() => {
        if (disabled || dragOver.current) return

        setIsTarget(true)
      }}
      onDrop={() => {
        if (disabled) return

        setIsTarget(false)
        onDrop?.()
      }}
    >
      <DropAreaIndicator
        style={{
          // ???
          height: !visible ? 0 : undefined,
          borderWidth: !visible ? 0 : undefined,
        }}
      />
      {children}
    </DropAreaContainer>
  )
}
