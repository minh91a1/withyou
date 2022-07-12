import { React, useEffect } from "react"

import { useNavigate } from "react-router-dom"
import common from "../utils/common"

import { useAuth } from "../hooks/useAuth.js"
import { Center, Text, Box, Image, Flex } from "@chakra-ui/react"

import BasePage from "./base/BasePage"
import HomeNav from "../components/HomeNav"

import classnames from "classnames"
import styles from "../css/base.module.css"
import useFetchInfinite from "../hooks/useFetchInfinite"
import FloatingButton from "../components/FloatingButton"

import { useSelector, useDispatch } from "react-redux"
import { useScrollPosition } from "../hooks/useScrollDirection"
import { save } from "../reducer/scrollReducer"

const DiaryPostCard = ({ post }) => {
  const navigate = useNavigate()

  const clickDiaryPost = () => {
    navigate(common.path.resolve("/diary/" + post.id))
  }

  return (
    <Box
      onClick={clickDiaryPost}
      key={post.id}
      bg={"white"}
      borderRadius={"25"}
      m="10"
      className={styles["diary-post-card"]}
    >
      <Image
        borderRadius={"20px"}
        overflow={"hidden"}
        minW={"300px"}
        minH={"200px"}
        maxW={{ sm: "100%", md: "300px" }}
        maxH={"200px"}
        objectFit="contain"
        src={process.env.REACT_APP_API_URL + post.imagePath}
        alt={"Rear view of modern home with pool"}
      />
      <Flex flexDirection={"column"}>
        <Text
          ml={"5"}
          mr={"5"}
          style={{ color: "white", fontWeight: "bold" }}
          maxW={"240px"}
        >
          {post.title}
        </Text>
        <Center>
          <Text
            maxW={"240px"}
            m={"5"}
            style={{ textAlign: "justify", color: "white" }}
          >
            {post.shortPost}
          </Text>
        </Center>
      </Flex>
    </Box>
  )
}

const DiaryContent = (props) => {
  const navigate = useNavigate()

  const scroll = useSelector((state) => state.scroll.value)
  const dispatch = useDispatch()

  useScrollPosition((top, end, scrollHeight) => {
    dispatch(save({ posY: top }))
  })

  // query
  const { data, error, status, fetchNextPage } = useFetchInfinite("post", "")

  const clickFloatingButton = (event) => {
    navigate(common.path.resolve("/diary/create")) //! THIS KILL SERVER EASILLY HAHAHAHAHAH :)))))))
  }

  const loadMore = () => {
    fetchNextPage()
  }

  useEffect(() => {
    console.log("1st time")
    let target = document.getElementById("allPost")?.parentElement
    target?.scrollTo(0, scroll.position.posY)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box id="allPost">
      <Image
        w="100vw"
        h="100vh"
        objectFit={"cover"}
        className={classnames(styles.darken, styles["background-image"])}
        alt="background"
        src="https://wallpapercave.com/wp/wp2872696.jpg"
      />

      <FloatingButton onClick={clickFloatingButton} />

      {!(status === "loading") &&
        //! !pending &&
        !error &&
        data && (
          <Flex flexWrap={"wrap"} justifyContent={"center"}>
            {Array.isArray(data.pages) &&
              data.pages.map((page) => {
                return page.map((post) => {
                  return <DiaryPostCard key={post.id} post={post} />
                })
              })}
          </Flex>
        )}
      <Center>
        <Text cursor={"pointer"} color={"white"} onClick={loadMore}>
          Các bài cũ hơn
        </Text>
      </Center>
    </Box>
  )
}

export default function Diary({ isAuth, setIsAuth }) {
  const { pending, auth } = useAuth()
  if (pending) {
    return <Center m={20}>Authorizing...</Center>
  }

  return (
    <BasePage
      showBack={false}
      nav={<HomeNav isAuth={isAuth} setIsAuth={setIsAuth} auth={auth} />}
      content={<DiaryContent isAuth={isAuth} />}
    ></BasePage>
  )
}
