import React from "react"
import { createRoot } from "react-dom/client"
import { GlobalStyle } from "./GlobalStyle"
import { App } from "./App"

// JSX は JS に変換される。html は js のみ扱えるため
const elementJSX = <h1 title="hello">Hello JSX!</h1>
const elementJS = React.createElement("h1", {title: "hello"}, "Hello JSX!")

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <>
    <GlobalStyle />
    <App />
  </>
)
