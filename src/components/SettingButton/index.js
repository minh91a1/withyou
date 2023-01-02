import React from "react"
import styles from "./index.module.scss"
import { AiFillSetting } from "react-icons/ai"

const SettingButton = ({ onClick }) => {
  return (
    <div className={styles["setting-button"]} onClick={() => onClick()}>
      <AiFillSetting className={styles["create-setting-button"]} />
    </div>
  )
}

export default SettingButton
