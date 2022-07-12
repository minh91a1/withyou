import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import styles from "../../css/base.module.css"

const ABasePage = ({
  isAuth,
  setIsAuth,
  showBack,
  nav,
  actionButtons,
  content,
  isLoading,
  error,
}) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Box h="100vh" className={styles.root}>
      {/* Navigator */}
      <Flex h={"50"} p="1">
        {nav ? (
          nav
        ) : (
          <>
            {showBack && (
              <Button onClick={goBack}>
                <ArrowBackIcon w={6} h={6} />
              </Button>
            )}
            <Spacer />
            {actionButtons}
          </>
        )}
      </Flex>

      {/* Body */}
      <Box h="calc(100% - (50px))" overflowY={"auto"} p="2">
        {error ? (
          error
        ) : isLoading ? (
          <Center mt="20">Đợi xíu...</Center>
        ) : (
          content
        )}
      </Box>
    </Box>
  )
}

ABasePage.defaultProps = {
  showBack: true,
}

export default ABasePage
