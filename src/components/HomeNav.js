import React from "react"
import { Center } from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"

import common from "../utils/common"
import classnames from "classnames"
import styles from "../css/base.module.css"
import config from "../config"

export default function HomeNav() {
  const location = useLocation()
  const navigate = useNavigate()

  let currentLink = location.pathname
  const clickNav = (link) => {
    console.log(link)
    navigate(common.path.resolve(link))
  }

  return (
    <Center w={"100%"} className={classnames(styles.navigator)}>
      <label
        onClick={() => {
          clickNav("")
        }}
        className={
          currentLink === config.BASE_PATH ? classnames(styles.selected) : ""
        }
      >
        Mái ấm
      </label>
      <label>Khám phá</label>
      <label>Kỷ niệm</label>
      <label
        onClick={() => {
          clickNav("/diary")
        }}
        className={
          currentLink.indexOf("/diary") >= 0 ? classnames(styles.selected) : ""
        }
      >
        Nhật ký
      </label>
    </Center>
  )
}
