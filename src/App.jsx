import React, { useRef, useState } from 'react';
import { render } from 'react-dom'
import { useDisclosure } from "@chakra-ui/react"

import EmailEditor from 'react-email-editor';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  ButtonGroup,
  Select,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import FirstFranklinBase from './Templates/1stFranklin'
import HootersBase from './Templates/Hooters'

export const App = (props: any) => {
  const emailEditorRef = useRef(null);
  const [curHtml, setCurHtml] = useState({})
  const [exportMode, setExportMode] = useState("html")
  const [curJson, setCurJson] = useState({})
  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('data', data)
      setCurHtml(data)
      setCurJson(JSON.stringify(design))
      onOpen()
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
    // loadCustomTemplate(BaseTemplate)
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');
  };

  const templates = {
    FirstFranklinBase: FirstFranklinBase,
    HootersBase: HootersBase
  }

  const loadCustomTemplate = (templateId) => {
    emailEditorRef.current.editor.loadDesign(templateId)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">

      <Grid minH="100vh" p={3}>

      <Flex justifyContent="space-between">
      <Heading>Morrison Email Editor</Heading>
        <ButtonGroup>
          <Button onClick={exportHtml} paddingLeft={10} paddingRight={10}>Export</Button>
          <Select placeholder="Choose Template" onChange={(e) => loadCustomTemplate(templates[e.target.value])}>
            <option value="FirstFranklinBase">1FC</option>
            <option value="HootersBase">Hooters</option>
          </Select>
          <ColorModeSwitcher justifySelf="flex-end" />
        </ButtonGroup>
      </Flex>

      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        minHeight="80vh"
        options={{
          user: {
            id: 1,
            name: "Annika Chauhan",
            email: "a.chauhan@novafutur.com",
          },
        }}
        // onReady={onReady}
      />
      </Grid>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Flex justifyContent="space-between">
          Export JSON/HTML
          <Box>
            <Button variant="ghost" onClick={() => navigator.clipboard.writeText(exportMode === "html" ? curHtml.html: curJson)}>
              Copy
            </Button>
            <Button variant="ghost" onClick={() => setExportMode(exportMode === "html" ? "json" : "html")}>View {exportMode === "html" ? "JSON" : "HTML"}</Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </Box>
          </Flex>
          </ModalHeader>
          <ModalBody>
            <Code>
              {exportMode === "html" ? (
                curHtml.html
              ) : curJson }
            </Code>
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
  </ChakraProvider>
  )

}
