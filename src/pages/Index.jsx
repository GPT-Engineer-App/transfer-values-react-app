import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, Text, Heading, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// Custom theme to apply throughout the app
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
});

const PageOne = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem("userInput", inputValue);
    navigate("/page-two");
  };

  return (
    <VStack spacing={4}>
      <Heading>Page One</Heading>
      <Input placeholder="Enter something..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button colorScheme="blue" onClick={handleSave}>
        Save & Go to Page Two
      </Button>
    </VStack>
  );
};

const PageTwo = () => {
  const savedValue = localStorage.getItem("userInput");

  return (
    <VStack spacing={4}>
      <Heading>Page Two</Heading>
      <Text>The value you entered was: "{savedValue}"</Text>
      <Link to="/">
        <Button colorScheme="teal">Back to Page One</Button>
      </Link>
    </VStack>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box p={5}>
          <Routes>
            <Route path="/" element={<PageOne />} />
            <Route path="/page-two" element={<PageTwo />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
