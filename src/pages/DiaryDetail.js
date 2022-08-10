import { React, useState, useEffect, useRef } from "react"

import { useNavigate, useParams } from "react-router-dom"
import common from "../utils/common"

import { useAuth } from "../hooks/useAuth.js"
import { Center, Text, Box, Image } from "@chakra-ui/react"

import { Editor } from "@tinymce/tinymce-react"

import ImageUploader from "../widgets/ImageUploader"
import BasePage from "./base/BasePage"
import HomeNav from "../components/HomeNav"

import classnames from "classnames"
import styles from "../css/base.module.css"

import useFetchOne from "../hooks/useFetchOne"
import FloatingButton from "../components/FloatingButton"

const DiaryDetailContent = (props) => {
  const params = useParams()
  const { data } = useFetchOne("post", params.postId)

  let navigate = useNavigate()

  const imageRef = useRef(null)
  const editorRef = useRef(null)

  //* states
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [selectedTags, setSelectedTags] = useState(null)

  useEffect(() => {
    if (data && data.length > 0) {
      let postData = data[0]
      if ((typeof postData).toLowerCase() === "object") {
        if (postData.title) setTitle(postData.title)
        if (postData.post) setPost(postData.post)
        if (postData.imagePath) setImagePath(postData.imagePath)
        setSelectedTags(postData.tags)
      }
    }
  }, [data])

  const clickFloatingButton = (event) => {
    navigate(common.path.resolve("/diary/edit/") + params.postId)
  }

  return (
    <Box>
      <Image
        w="100vw"
        h="100vh"
        objectFit={"cover"}
        className={classnames(styles.darken, styles["background-image"])}
        alt="background"
        src={
          imagePath
            ? process.env.REACT_APP_API_URL + imagePath
            : "https://wallpapercave.com/wp/wp2872696.jpg"
        }
      />

      <FloatingButton onClick={clickFloatingButton} />

      <Box className={classnames(styles["diary-detail-container"])}>
        <Center maxW={800} minW={250}>
          <Text className={styles.diaryCardTitle}>{title}</Text>
        </Center>

        {imagePath ? (
          <Center>
            <ImageUploader ref={imageRef} value={imagePath} readonly={true} />
          </Center>
        ) : null}

        {selectedTags ? (
          <Center display={"flex"} m="2">
            {selectedTags.map((tag) => (
              <Box key={tag.id} className={classnames(styles["diary-tag"])}>
                {tag.tag_name}
              </Box>
            ))}
          </Center>
        ) : null}

        <Box
          className={"read-only"}
          margin={"auto"}
          w="50vw"
          maxW={800}
          minW={250}
          // paddingLeft={{ sm: "0", md: "100px" }}
          // paddingRight={{ sm: "0", md: "100px" }}
        >
          <Editor
            disabled={true}
            apiKey="qquo11hnj7kfwwjjusbrxt69wlxe0l24c3dyehw7a57j0vpm"
            onInit={(evt, editor) => {
              editorRef.current = editor
            }}
            initialValue={post}
            init={{
              menubar: false,
              toolbar: false,
              statusbar: false,
              plugins: ["autoresize"],
              content_style: `
              @import url("https://fonts.googleapis.com/css2?family=Arima:wght@100;400&family=Baloo+2&family=Dancing+Script&family=Dosis:wght@200;400&family=The+Nautigal&display=swap");
              body { font-family: Arima,Arial,sans-serif; font-size: 1.3rem; text-align: justify; line-height: 2rem } 
              html {background: whitesmoke; color: black}
            `,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default function DiaryDetail({ isAuth, setIsAuth }) {
  const { pending, auth } = useAuth()
  if (pending) {
    return <Center m={20}>Authorizing...</Center>
  }

  return (
    <BasePage
      showBack={false}
      nav={<HomeNav isAuth={isAuth} setIsAuth={setIsAuth} auth={auth} />}
      content={<DiaryDetailContent isAuth={isAuth} />}
    ></BasePage>
  )
}
