import React from "react"
import styled from "styled-components"
import * as color from '../../utils/color'
import { SearchIcon as _SearchIcon } from "../../style/icon"

const Container = styled.label`
  display: flex;
  align-items: center;
  min-width: 300px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
`
const SearchIcon = styled(_SearchIcon)`
  margin: 0 4px 0 8px;
  font-size: 16px;
  color: ${color.Silver};
`
const Input = styled.input.attrs({type: 'search'})`
  width: 100%;
  padding: 6px 8px 6px 0;
  color: ${color.White};
  font-size: 14px;

  :focus {
    outline: none;
  }
`

export function CardFilter({
  value,
  onChange,
}: {
  value?: string,
  onChange?(value: string): void,
}) {
  return (
    <Container>
      <SearchIcon />
      <Input
        placeholder="Filter Cards"
        value={value}
        onChange={e => onChange?.(e.currentTarget.value)}
      />
    </Container>
  )
}
