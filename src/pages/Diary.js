import { React, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import common from "../utils/common"

import { useAuth } from "../hooks/useAuth.js"
import { Center, Text, Box, Image, Flex, Input } from "@chakra-ui/react"

import BasePage from "./base/BasePage"
import HomeNav from "../components/HomeNav"

import classnames from "classnames"
import styles from "../css/base.module.css"
import useFetchInfinite from "../hooks/useFetchInfinite"
import FloatingButton from "../components/FloatingButton"

import { useSelector, useDispatch } from "react-redux"
import { useScrollPosition } from "../hooks/useScrollDirection"
import { save } from "../reducer/scrollReducer"
import { setKey, setTags } from "../reducer/searchReducer"
import Tags from "../components/Tags"
import { useDebouncing } from "../hooks/useDebouncing"

const DiaryPostCard = ({ post }) => {
  const navigate = useNavigate()

  const width = "250px"

  const clickDiaryPost = () => {
    navigate(common.path.resolve("/diary/" + post.id))
  }

  return (
    <Box
      onClick={clickDiaryPost}
      key={post.id}
      bg={"white"}
      borderRadius={"14px"}
      m="0px 40px 30px 40px"
      className={styles["diary-post-card"]}
    >
      <Box
        bg={"white"}
        borderRadius={"14px 14px 0px 0px"}
        w={width}
        h={"180px"}
        overflow={"hidden"}
      >
        <Image
          w={width}
          h={"180px"}
          objectFit={"cover"}
          src={process.env.REACT_APP_API_URL + post.imagePath}
          alt="No image to show"
          className={classnames(styles["diary-card-image"])}
        />
      </Box>
      <Flex flexDirection={"column"}>
        <Text p={"5px 15px 0px 15px"} color="white">
          {post.createTime
            ? new Date(post.createTime).toLocaleDateString() +
              " " +
              new Date(post.createTime).toLocaleTimeString()
            : ""}
        </Text>
        <Text
          p={"5px 15px 0px 15px"}
          maxW={width}
          h={"60px"}
          className={classnames(
            styles["max-2-lines"],
            styles["diary-card-title"]
          )}
        >
          {post.title}
        </Text>
        <Center>
          <Text
            display={"none"}
            maxW={"240px"}
            m={"5"}
            style={{ textAlign: "justify", color: "white" }}
          >
            {post.shortPost}
          </Text>
        </Center>
      </Flex>
      {post.tags ? (
        <Box display={"flex"} m="2">
          {post.tags.map((tag) => (
            <Box key={tag.id} className={classnames(styles["diary-tag"])}>
              {tag.tag_name}
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}

const DiaryPostList = () => {
  //* redux
  const search = useSelector((state) => state.search.value)
  const scroll = useSelector((state) => state.scroll.value)
  const dispatch = useDispatch()

  // query
  const { data, error, status, refetch, fetchNextPage } = useFetchInfinite(
    "post",
    search.searchKey ? search.searchKey : "",
    search.tags
  )

  //* states
  useScrollPosition((top, end, scrollHeight) => {
    dispatch(save({ posY: top }))
  })

  const loadMore = () => {
    fetchNextPage()
  }

  //* effects
  useEffect(() => {
    console.log("1st time")
    let target = document.getElementById("allPost")?.parentElement
    target?.scrollTo(0, scroll.position.posY)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.tags, search.searchKey])

  return (
    <>
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
    </>
  )
}

const DiaryBody = (props) => {
  const navigate = useNavigate()

  //* redux
  const dispatch = useDispatch()

  const [query, setQuery] = useState(null)
  useDebouncing(query, () => {
    dispatch(setKey(query))
  })

  function onSelectionChanged(selectedTags) {
    dispatch(setTags([...selectedTags]))
  }

  const clickFloatingButton = (event) => {
    navigate(common.path.resolve("/diary/create")) //! THIS KILL SERVER EASILLY HAHAHAHAHAH :)))))))
  }

  function onInputSearch(event) {
    setQuery(event.target.value)
  }

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

      <Center>
        <Tags onSelectionChanged={onSelectionChanged} />
      </Center>

      <Center m="0px 20px 30px 20px">
        <Input
          className={classnames(styles.placeholder)}
          maxW={"500px"}
          color={"ghostwhite"}
          bg="whiteAlpha.500"
          placeholder="Search..."
          onInput={onInputSearch}
        />
      </Center>

      <DiaryPostList />
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
      content={<DiaryBody isAuth={isAuth} />}
    ></BasePage>
  )
}
