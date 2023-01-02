import { React } from "react"

import BasePage from "./base/BasePage"

import { useAuth } from "../hooks/useAuth.js"
import { Center, Text, Box, Image, Avatar, Flex } from "@chakra-ui/react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper"

import classnames from "classnames"
import styles from "../css/base.module.css"

import useFetchInfinite from "../hooks/useFetchInfinite"

import { AiFillHome, AiOutlineTwitter } from "react-icons/ai"

import { format } from "date-fns"
import HomeNav from "../components/HomeNav"
import { useNavigate } from "react-router-dom"
import common from "../utils/common"

const DiaryCard = ({ id, image, content, time, title }) => {
  const navigate = useNavigate()
  const clickDiaryPost = () => {
    navigate(common.path.resolve("/diary/" + id))
  }

  return (
    <Box
      onClick={clickDiaryPost}
      display={{ md: "flex" }}
      pl={{ base: "50px", sm: "50px", md: "100px" }}
      pr={{ base: "50px", sm: "50px", md: "100px" }}
      className={styles.diaryCard}
      borderWidth="1px"
      overflow="hidden"
    >
      <Image
        borderRadius={"20px"}
        overflow={"hidden"}
        maxW={{ sm: "100%", md: "300px" }}
        maxH={"200px"}
        objectFit="contain"
        src={image ? image : "https://bit.ly/2Z4KKcF"}
        alt={"Rear view of modern home with pool"}
      />
      <Box ml="4">
        <Text className={styles.diaryCardTitle}>
          {title ? title : "Tiêu đề bài viết"}
        </Text>
        <Text className={classnames(styles.diaryCardContent)}>
          {"- " +
            format(time ? new Date(time) : new Date(), "dd/MM/yyyy HH:mm") +
            " -"}
        </Text>
        <Text
          className={classnames(styles["max-5-lines"], styles.diaryCardContent)}
        >
          {content ? content : "Nội dung bài viết"}
        </Text>
      </Box>
    </Box>
  )
}

const HomeContent = (props) => {
  const textWelcome = "Hôm nay có đáng để nhớ về không thế (*^▽^*)!"
  const textWords = `Mục tiêu tối thượng của năm nay: 365 trải nghiệm mới.
  Vì cuộc sống không phải những ngày đã qua, mà phải là những ngày đáng để chúng ta nhở về.
  - Better Version -.
  
  `

  // query
  const { data, error, status } = useFetchInfinite("post", "")

  const clickPet = (event) => {
    document.getElementById("pet-playground").style.display = "block"
    document.getElementById("petCore").style.color = "red"
  }

  const clickPlayground = (event) => {
    let x = event.clientX
    let y = event.clientY

    const currentPos = document.getElementById("pet").getBoundingClientRect()

    let flip = currentPos.left > x
    if (flip) {
      document.getElementById("petCore").style.transform = "scaleX(-1)"
    } else {
      document.getElementById("petCore").style.transform = "scaleX(1)"
    }

    document.getElementById("pet").style.transform =
      "translate3d(" + x + "px," + y + "px, 0px)"
    document.getElementById("pet-playground").style.display = "none"
    document.getElementById("petCore").style.color = "dodgerblue"
  }

  return (
    <>
      <div id="pet" className={styles.pet} onClick={clickPet}>
        <AiOutlineTwitter
          id="petCore"
          className={styles.petCore}
          size={"40px"}
        />
      </div>
      <div
        id="pet-playground"
        onClick={clickPlayground}
        className={classnames(styles.darken, styles["pet-playground"])}
      ></div>
      <Image
        w="100vw"
        h="100vh"
        objectFit={"cover"}
        className={classnames(styles.darken, styles["background-image"])}
        alt="background"
        src="https://myxhanh.myds.me:2591/images/1672641899981_50q9gmuqgjntakr0cio15.jpg"
      />
      <Text
        fontSize={{ base: "3rem", md: "5rem" }}
        className={styles.homePageTitle}
      >
        {textWelcome}
      </Text>
      <Text
        mb={10}
        className={classnames(
          styles["home-page-words"],
          styles["accept-new-line"]
        )}
      >
        {textWords}
      </Text>

      <Box>
        <Flex flexDirection={"column"}>
          <Center>
            <Avatar
              size="2xl"
              src="http://danhngon.nhadatso.com/images/post/2015/05/21/11//co-don-la-mot-nguoi-ban.jpg"
            />
          </Center>
          <Center>
            <Text textAlign={"center"} className={styles["user-name"]}>
              Nỗ lực trong cô đơn
            </Text>
          </Center>
          <Center>
            <Text textAlign={"center"} className={styles["user-quote"]}>
              {`Đây là cuộc chiến khó khăn chỉ có thể bước đi một mình. Hãy cố lên nhé, cái tôi ơi 😌`}
            </Text>
          </Center>
        </Flex>
      </Box>

      {!(status === "loading") &&
        //! !pending &&
        !error &&
        data &&
        Array.isArray(data.pages) && (
          <Swiper
            autoplay={{
              delay: 10000,
              disableOnInteraction: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data.pages.map((page) => {
              return page.map((post) => {
                return (
                  <SwiperSlide>
                    <DiaryCard
                      id={post.id}
                      image={
                        post.imagePath
                          ? process.env.REACT_APP_API_URL + post.imagePath
                          : "https://myxhanh.myds.me:2591/images/1672642014952_082cs1de4j96uq4g27d0kg.png"
                      }
                      time={post.createTime}
                      title={post.title}
                      content={post.shortPost}
                    />
                  </SwiperSlide>
                )
              })
            })}
          </Swiper>
        )}

      <Box>
        <Flex
          m="10"
          justifyContent={"flex-end"}
          className={styles["my-pet-home"]}
        >
          <AiFillHome size={"24px"} color={"white"} />
        </Flex>
      </Box>
    </>
  )
}

const RealHome = ({ isAuth, setIsAuth }) => {
  const { pending, auth } = useAuth()
  if (pending) {
    return <Center m={20}>Authorizing...</Center>
  }

  return (
    <BasePage
      showBack={false}
      nav={<HomeNav isAuth={isAuth} setIsAuth={setIsAuth} auth={auth} />}
      content={<HomeContent isAuth={isAuth} />}
    ></BasePage>
  )
}

export default RealHome
