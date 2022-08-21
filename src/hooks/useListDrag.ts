import { useRef } from 'react'
import { DRAG_TIMEOUT } from '../utils/constants'

/**
 * dragOver イベントが継続中かどうかのフラグを ref として返す
 * @param timeout 自動でフラグを false にするまでの時間(ms)
 * @returns
 */
export function useDragAutoLeave(timeout: number = DRAG_TIMEOUT) {
  const dragOver = useRef(false)
  const timer = useRef(0)

  return [
    dragOver,
    (onDragLeave?: () => void) => {
      clearTimeout(timer.current)
      dragOver.current = true

      timer.current = setTimeout(() => {
        dragOver.current = false
        onDragLeave?.()
      }, timeout)
    },
  ] as const
}