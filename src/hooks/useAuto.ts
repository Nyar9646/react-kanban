import { useRef, useEffect } from "react"

/**
 * テキストエリアの高さを内容に合わせて自動調整する
 * @param content : テキストエリアの内容;
 * @returns
 */
export function useAutoFitToContentHeight(content: string | undefined) {
  // ＊JSX で ref prop 設定をした html interface 要素の実態を取得
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // html interface の現在の状態を取得
    const el = ref.current
    if (!el) return

    // ＊指定したタグ要素ののスタイルを取得
    const { borderTopWidth, borderBottomWidth } = getComputedStyle(el)
    // ＊入力行数が減少した場合。高さを縮める
    el.style.height = 'auto'
    // ＊上罫線の太さ + 入力した際に起こったスクロールの高さ + 下罫線の太さ
    el.style.height = `calc(${borderTopWidth} + ${el.scrollHeight}px + ${borderBottomWidth})`
  }, [content])

  return ref
}