import {
  Box,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react"

function ImageUploader(props, ref) {
  const inputRef = useRef()
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (props.value) setPreview(process.env.REACT_APP_API_URL + props.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  useEffect(() => {
    if (!selectedFile) {
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
    get: () => {
      return selectedFile
    },
  }))

  const onFileChange = useCallback((event) => {
    setSelectedFile(event.target.files[0])
  }, [])

  function onGetImageFromClipboard(evt) {
    console.log(evt)
    // Get the data of clipboard
    const clipboardItems = evt.clipboardData.items
    const items = [].slice.call(clipboardItems).filter(function (item) {
      // Filter the image items only
      return item.type.indexOf("image") !== -1
    })
    if (items.length === 0) {
      return
    }

    const item = items[0]
    // Get the blob of image
    const blob = item.getAsFile()
    console.log(blob)
    setSelectedFile(blob)
  }

  function onClickPreviewImage() {
    if (props.readonly) {
      onOpen()
    }
  }

  return (
    <div style={{ display: "inline-block" }}>
      {props.readonly ? null : (
        <Center>
          <Box rounded="md" bg="white" p={2} onPaste={onGetImageFromClipboard}>
            Ctrl + V
          </Box>
        </Center>
      )}

      <label htmlFor={props.readonly ? "." : "file-upload"}>
        {/* pick up image from local */}
        {selectedFile === null && (preview === null || preview === undefined) && (
          <Center>
            <Box
              rounded="md"
              color="gray"
              border="2px"
              borderColor="gray.200"
              borderStyle="dashed"
              m={2}
              p={2}
              width="100%"
              maxW={800}
              cursor="pointer"
            >
              <Center color={"white"}>Add an image +</Center>
            </Box>
          </Center>
        )}

        {/* preview image */}
        {(selectedFile || preview) && (
          <Box
            mt={2}
            mb={2}
            cursor="pointer"
            maxW={800}
            margin={"auto"}
            onClick={onClickPreviewImage}
          >
            <Center
              m="3"
              boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              rounded="md"
              bg="white"
              overflow={"hidden"}
            >
              <img
                style={{ maxHeight: "400px" }}
                src={preview}
                alt="Preview should be here!"
              />
            </Center>
          </Box>
        )}
      </label>
      <input
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={onFileChange}
      />

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>&nbsp;</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <img src={preview} alt="Preview should be here!" />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default forwardRef(ImageUploader)
