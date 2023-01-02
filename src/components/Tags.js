import { useState, useEffect } from "react"
import useFetchCollection from "../hooks/useFetchCollection"
import { useSelector } from "react-redux"
import { Box, Flex } from "@chakra-ui/react"

import classnames from "classnames"
import styles from "../css/base.module.css"

export default function Tags({ onSelectionChanged }) {
  const { data } = useFetchCollection("tag", "")

  //* redux
  const search = useSelector((state) => state.search.value)

  //* states
  const [selectedTags, setSelectedTags] = useState(search.tags)

  useEffect(() => {
    if (onSelectionChanged) {
      onSelectionChanged(selectedTags)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags])

  function clickTag(event, tagId) {
    let ids = selectedTags.filter((e) => e !== tagId)
    if (ids.length === selectedTags.length) {
      setSelectedTags([...selectedTags, tagId])
    } else {
      setSelectedTags([...ids])
    }
  }

  return (
    <>
      {data ? (
        <Flex m="2" flexWrap="wrap">
          {data.map((tag) => (
            <Box
              key={tag.id}
              className={classnames(
                styles["diary-tag"],
                selectedTags.indexOf(tag.id) >= 0 ? styles["selected"] : ""
              )}
              onClick={(e) => clickTag(e, tag.id)}
            >
              {tag.tag_name}
            </Box>
          ))}
        </Flex>
      ) : null}
    </>
  )
}
