import React from "react"
import styled from "styled-components"
import * as color from '../../utils/color'
import { CardFilter } from "../components/CardFilter"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${color.Navy};
`
const Logo = styled.div`
  color: ${color.Silver};
  font-size: 16px;
  font-weight: bold;
`

export function Header({
  filterValue,
  onFilterChange,
  className,
}: {
  filterValue?: string,
  onFilterChange?(value: string): void,
  className?: string,
}) {
  return (
    <Container className={className}>
      <Logo>Kanban board</Logo>
      <CardFilter value={filterValue} onChange={onFilterChange} />
    </Container>
  )
}

