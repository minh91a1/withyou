import React from "react"
import globalCss from "../../css/base.module.css"
import styles from "./index.module.scss"
import classnames from "classnames"
import { useNavigate } from "react-router-dom"
import common, { tools } from "../../utils/common"

const QuoteItem = ({ post }) => {
  //* var hook state
  const navigate = useNavigate()

  //* function
  const clickQuote = () => {
    console.log("hihi")
    navigate(common.path.resolve("/diary/" + post.id))
  }

  //* effect

  //* other

  return (
    <div
      onClick={clickQuote}
      className={classnames([
        styles["quote-item-container"],
        styles["bg-month-" + tools.getMonth(new Date(post.createTime))],
      ])}
    >
      <div
        className={classnames([
          styles["quote-item"],
          styles["month-color"],
          globalCss["max-1-lines"],
        ])}
      >
        <span
          className={classnames([
            styles["quote-item-time"],
            styles["month-" + tools.getMonth(new Date(post.createTime))],
          ])}
        >
          {tools.shortDate(new Date(post.createTime))}
        </span>
        {post.title}
      </div>
    </div>
  )
}

export default QuoteItem
