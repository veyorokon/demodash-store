import React from "react";
import {Box, Flex, Text} from "components";
import styled from "styled-components";
import {API_MEDIA} from "api";

const BackgroundImage = styled(Box)`
  background: url(${props => props.image});
  width: 10rem;
  min-width: 10rem;
  height: 10rem;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
`;

function CheckoutCard(props) {
  console.log(props);
  return (
    <Flex
      flexGrow={0}
      p={1}
      pb={2}
      mt={2}
      bg={"whites.0"}
      h={"fit-content"}
      minHeight={"fit-content"}
      w="100%"
      maxWidth="100%"
      br={2}
      alignItems="flex-start"
      borderBottom="1px solid #e3e3ee"
      {...props}
    >
      {props.images && props.images.length && (
        <BackgroundImage
          mr={2}
          br={1}
          image={API_MEDIA + props.images[0].image}
        />
      )}
      <Box w={"fit-content"}>
        <Text>Here</Text>
      </Box>
    </Flex>
  );
}

export default CheckoutCard;
