import React from 'react'
import { Helmet } from 'react-helmet'
import { jsx, css } from '@emotion/core'

import useTodo from '../hooks/useTodo'

const titleStyle = css`
  h1 {
    margin: 0;
    font-size: 20px;
    color: orange;
  }
`

const News = () => {
  const { state, addTodo, removeTodo } = useTodo()

  return <div>
    <Helmet>
      <title>News</title>
    </Helmet>
    <div css={titleStyle}>News</div>
    <div>
      {state.map((message) => <p>{message}</p>)}
    </div>
    <div>
      <button onClick={addTodo}>추가</button>
      <button onClick={removeTodo}>삭제</button>
    </div>
  </div>
}

export default News