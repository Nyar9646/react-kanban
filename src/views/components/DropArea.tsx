import { useState } from "react"
import styled from "styled-components"
import * as color from '../../utils/color'
import { useDragAutoLeave } from "../../hooks/useListDrag"

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
}
