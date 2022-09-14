import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 8%, 0.4);
`

export function Overlay({
  onClick,
  className,
  children,
}: {
  onClick?(): void,
  className?: string,
  children?: React.ReactNode,
}) {
  return (
    <Container
      className={className}
      onClick={e => {
        // ??? 更新前後の値の比較？
        if (e.target !== e.currentTarget) return
        onClick?.()
      }}
    >
      {children}
    </Container>
  )
}
