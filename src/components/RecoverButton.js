import { useState, useEffect } from "react"
import { RepeatClockIcon } from "@chakra-ui/icons"

import classnames from "classnames"
import styles from "../css/base.module.css"
import common from "../utils/common"

export default function RecoverButton({ postId, setPost }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let data = common.tempStorage.load(postId)
    setVisible(data && data.length > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadUnsavedPost() {
    let data = common.tempStorage.load(postId)
    if (data && data.length > 0) {
      setPost(common.tempStorage.load(postId))
    }
  }

  return (
    <div
      style={{ display: visible ? "flex" : "none" }}
      onClick={loadUnsavedPost}
      className={classnames(
        styles["floating-button"],
        styles["recover-button"]
      )}
    >
      <RepeatClockIcon color={"cornflowerblue"} />
    </div>
  )
}
