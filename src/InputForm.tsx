import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as color from './color'
import { Button, ConfirmButton } from "./Button";
import { useAutoFitToContentHeight } from "./hooks/useAuto";

const Container = styled.div``
const Input = styled.textarea`
  display: block;
  width: 100%;
  margin-bottom: 8px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.White};
  font-size: 14px;
  line-height: 1.7;

  :focus {
    outline: none;
    border-color: ${color.Blue};
  }
`
const ButtonRow = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 8px;
  }
`
const AddButton = styled(ConfirmButton).attrs({
  children: 'Add',
})``
const CancelButton = styled(Button).attrs({
  children: 'Cancel',
})``

export function InputForm({
  value,
  onChange,
  onConfirm,
  onCancel,
  className,
}: {
  value?: string,
  onChange?(value: string): void,
  onConfirm?(): void,
  onCancel?(): void,
  className?: string,
}) {
  // trim() : 文字列の両端の空白を除去
  const disabled = !value?.trim()

  const handleConfirm = () => {
    if (disabled) return

    // ＊null許可関数の呼び出し方 : func?.()
    onConfirm?.()
  }

  const ref = useAutoFitToContentHeight(value)

  return (
    <Container className={className}>
      <Input
        ref={ref}
        autoFocus
        placeholder="Enter a note"
        value={value}
        onChange={e => onChange?.(e.currentTarget.value)}
        onKeyDown={e => {
          // metaKey = commandボタン, windowsボタン
          if (!((e.metaKey || e.ctrlKey) && e.key === 'Enter')) return

          handleConfirm()
        }}
      />

      <ButtonRow>
        <AddButton disabled={disabled} onClick={handleConfirm} />
        <CancelButton onClick={onCancel} />
      </ButtonRow>
    </Container>
  )
}