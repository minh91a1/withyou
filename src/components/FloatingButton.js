import React from "react"
import { useLongPress } from "use-long-press"

import styles from "../css/base.module.css"

import { AiOutlineHighlight } from "react-icons/ai"

export default function FloatingButton({ onClick, onLongClick }) {
  const bind = useLongPress(
    () => {
      onLongClick()
    },
    {
      onCancel: (event) => {
        onClick()
      },
    }
  )

  return (
    <div {...bind()} className={styles["floating-button"]}>
      <AiOutlineHighlight className={styles["create-button"]} />
    </div>
  )
}
