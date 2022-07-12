import React from "react"

import styles from "../css/base.module.css"

import { AiOutlineHighlight } from "react-icons/ai"

export default function FloatingButton({ onClick }) {
  return (
    <div onClick={onClick} className={styles["floating-button"]}>
      <AiOutlineHighlight className={styles["create-button"]} />
    </div>
  )
}
