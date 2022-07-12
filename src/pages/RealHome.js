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

const DiaryCard = ({ image, content, time, title }) => {
  return (
    <Box
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
  const textWelcome = "Chào mừng bạn về nhà!"
  const textWords = `Một ngày vất vả nhưng bạn đã làm hết mình rồi. 
  Giờ là khoảng thời gian hồi phục tinh thần và thể chất.
    Hãy tưởng thưởng cho bản thân vì những cố gắng của hôm nay nhé!`

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
        src="https://wallpapercave.com/wp/wp2872696.jpg"
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
              src="https://haycafe.vn/wp-content/uploads/2021/12/Hinh-nen-cute.jpg"
            />
          </Center>
          <Center>
            <Text textAlign={"center"} className={styles["user-name"]}>
              Thỏ con yêu đời
            </Text>
          </Center>
          <Center>
            <Text textAlign={"center"} className={styles["user-quote"]}>
              - Hãy sống trọn vẹn, đừng để những nỗi lo âu làm cuộc sống vốn đã
              quý giá này phải bị phí phạm bởi những phiền đau. -
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
                      image={process.env.REACT_APP_API_URL + post.imagePath}
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
