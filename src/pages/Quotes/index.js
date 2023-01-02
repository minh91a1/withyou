import { Center, Image, Text } from "@chakra-ui/react"
import BasePage from "../base/BasePage"
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import QuoteItem from "../../components/QuoteItem"
import useFetchInfinite from "../../hooks/useFetchInfinite"
import { useScrollPosition } from "../../hooks/useScrollDirection"
import { save } from "../../reducer/scrollReducer"
import HomeNav from "../../components/HomeNav"
import { useAuth } from "../../hooks/useAuth"
import globalCss from "../../css/base.module.css"
import styles from "./index.module.scss"
import classnames from "classnames"
import Tags from "../../components/Tags"
import { setTags } from "../../reducer/searchReducer"
import FloatingButton from "../../components/FloatingButton"
import SettingButton from "../../components/SettingButton"
import { useNavigate } from "react-router-dom"
import common from "../../utils/common"

const QuotesBody = () => {
  console.log("render child start")
  //* 1. var hook state
  const navigate = useNavigate()
  const search = useSelector((state) => state.search.value)
  const scroll = useSelector((state) => state.scroll.value)
  const dispatch = useDispatch()
  const { data, error, status, fetchNextPage } = useFetchInfinite(
    "post",
    "",
    search.tags,
    20
  )

  useScrollPosition((top, end, scrollHeight) => {
    dispatch(save({ posY: top }))
  })

  //* 2. function
  const loadMore = () => {
    fetchNextPage()
  }

  function onSelectionChanged(selectedTags) {
    dispatch(setTags([...selectedTags]))
  }

  const clickFloatingButton = (event) => {
    navigate(common.path.resolve("/diary/create")) //! THIS KILL SERVER EASILLY HAHAHAHAHAH :)))))))
  }

  const clickSettingButton = () => {}

  //* 3. effect
  useEffect(() => {
    let target = document.getElementById("allQuotes")?.parentElement
    target?.scrollTo(0, scroll.position.posY)

    console.log("render child complete", document.getElementById("allQuotes"))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //* 4. other

  console.log("render child end")

  return (
    <div id="allQuotes">
      <Image
        w="100vw"
        h="100vh"
        objectFit={"cover"}
        className={classnames(globalCss.darken, globalCss["background-image"])}
        alt="background"
        src="https://myxhanh.myds.me:2591/images/1672641899981_50q9gmuqgjntakr0cio15.jpg"
      />{" "}
      <Center>
        <Tags onSelectionChanged={onSelectionChanged} />
      </Center>
      {!(status === "loading") &&
        //! !pending &&
        !error &&
        data && (
          <div className={classnames(styles["quotes-container"])}>
            {Array.isArray(data.pages) &&
              data.pages.map((page) => {
                return page.map((post) => {
                  return <QuoteItem key={post.id} post={post}></QuoteItem>
                })
              })}
          </div>
        )}
      <Center>
        <Text cursor={"pointer"} color={"white"} onClick={loadMore}>
          Các bài cũ hơn
        </Text>
      </Center>
      <FloatingButton onClick={clickFloatingButton} />
      <SettingButton onClick={clickSettingButton} />
    </div>
  )
}

const Quotes = ({ isAuth, setIsAuth }) => {
  console.log("render parent start")

  //* 1. var hook state
  const { pending, auth } = useAuth()

  //* 2. function

  //* 3. effect

  //* 4. other

  if (pending) {
    return <Center m={20}>Authorizing...</Center>
  }

  return (
    <BasePage
      showBack={false}
      nav={<HomeNav isAuth={isAuth} setIsAuth={setIsAuth} auth={auth} />}
      content={<QuotesBody />}
    ></BasePage>
  )
}

export default Quotes
