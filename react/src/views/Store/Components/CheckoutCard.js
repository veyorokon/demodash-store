import React from "react";
import {Box, Flex, Text} from "components";
import styled from "styled-components";
import {responsive as r} from "lib";
import {API_MEDIA} from "api";

const BackgroundImage = styled(Box)`
  background: url(${props => props.image});
  min-width: 10rem;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  transition: width 0.3s, height 0.3s;
`;

const CardText = styled(Text)`
  transition: margin 0.3s, font-size 0.3s;
`;

function getImage(images, variationsChosen = null) {
  let variationChosenList = [];
  if (!variationsChosen) return images[0];
  //Create list of variations chosen
  Object.keys(variationsChosen).forEach(function(variation) {
    variationChosenList.push(variationsChosen[variation]);
  });
  let variationImage = images.filter(function(image) {
    return (
      image.variationOption &&
      variationChosenList.includes(parseInt(image.variationOption.id))
    );
  });
  if (variationImage.length) return variationImage[0];
  return images[0];
}

function CheckoutCard(props) {
  const {product, variationsChosen} = props;
  const checkoutImage = getImage(product.images, variationsChosen);
  return (
    <Flex
      flexGrow={0}
      mt={3}
      mb={1}
      bg={"whites.0"}
      h={"fit-content"}
      minHeight={"fit-content"}
      w="100%"
      maxWidth="100%"
      alignItems="flex-start"
      {...props}
    >
      <BackgroundImage
        w={r("10rem ---> 15rem")}
        h={r("10rem ---> 15rem")}
        mr={2}
        br={1}
        image={API_MEDIA + checkoutImage.image}
      />
      <Box w={"fit-content"}>
        <CardText fs={r("1.4rem ---> 1.6rem")}>{product.name}</CardText>
        <CardText fs={r("1.2rem ---> 1.4rem")} color="greys.0" mt={r("1 2")}>
          {product.description}
        </CardText>
        <CardText fs={r("1.4rem ---> 1.6rem")} mt={r("1 2")}>
          {props.amount}
        </CardText>
      </Box>
    </Flex>
  );
}

export default CheckoutCard;
