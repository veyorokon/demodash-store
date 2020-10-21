import React from "react";
import {Box, Flex, Text, Icon} from "components";
import styled from "styled-components";
import {responsive as r} from "lib";
import {connect} from "react-redux";
import {updateCart} from "redux/actions";
import {Plus} from "@styled-icons/boxicons-regular/Plus";
import {Minus} from "@styled-icons/boxicons-regular/Minus";

import {API_MEDIA} from "api";

const BackgroundImage = styled(Box)`
  background: url(${props => props.image});
  min-width: 10rem;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  transition: width 0.3s, height 0.3s, margin 0.3s;
`;

const CardText = styled(Text)`
  transition: margin 0.3s, font-size 0.3s;
`;

function getVariations(variations, variationsChosen = null) {
  let variationChosenList = [];
  if (!variationsChosen) return null;
  //Create list of variations chosen
  Object.keys(variationsChosen).forEach(function(variation) {
    let variationOptionId = variationsChosen[variation];
    let variationData = {
      variationId: parseInt(variation),
      variationOptionId: variationOptionId
    };
    variationChosenList.push(variationData);
  });
  let variationChosenData = [];
  for (var index in variationChosenList) {
    let chosenVariation = variationChosenList[index];
    let productVariation = variations.filter(function(variation) {
      return parseInt(variation.id) === chosenVariation.variationId;
    })[0];
    let productVariationOption = productVariation.options.filter(function(
      variationOption
    ) {
      return parseInt(variationOption.id) === chosenVariation.variationOptionId;
    })[0];
    variationChosenData.push({
      name: productVariation.name,
      option: productVariationOption.option
    });
  }
  return variationChosenData;
}

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

function Price(props) {
  let hasShippingPrice = false;
  if (props.shippingPrice && props.shippingPrice !== 0) hasShippingPrice = true;
  return (
    <Flex mt={r("1 2")} {...props}>
      <CardText mr={1} fs={r("1.4rem ---> 1.6rem")}>
        $
      </CardText>
      <CardText fs={r("1.4rem ---> 1.6rem")}>{props.price.toFixed(2)}</CardText>
      {hasShippingPrice && (
        <Flex ml={2}>
          <CardText mr={2} fs={r("1.4rem ---> 1.6rem")}>
            +
          </CardText>
          <CardText fs={r("1.4rem ---> 1.6rem")}>
            ${props.shippingPrice.toFixed(2)}
          </CardText>
        </Flex>
      )}
    </Flex>
  );
}

function _CheckoutCard(props) {
  const {product, variationsChosen} = props;
  const checkoutImage = getImage(product.images, variationsChosen);
  const variationData = getVariations(product.variations, variationsChosen);
  let hasVariationData = false;
  if (variationData && variationData.length) hasVariationData = true;
  console.log(props);
  return (
    <Flex
      flexGrow={0}
      mt={3}
      mb={2}
      bg={"whites.0"}
      h={"fit-content"}
      minHeight={"fit-content"}
      w="100%"
      maxWidth="100%"
      alignItems="center"
      {...props}
    >
      <BackgroundImage
        w={r("10rem ---> 15rem")}
        h={r("10rem ---> 15rem")}
        mr={r("2 ---> 3")}
        br={1}
        image={API_MEDIA + checkoutImage.image}
      />
      <Flex
        pb={1}
        h={"100%"}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box w={"fit-content"}>
          <CardText fw={400} fs={r("1.4rem ---> 1.6rem")}>
            {product.name}
          </CardText>
          <CardText fs={r("1.2rem ---> 1.4rem")} color="greys.0" mt={r("1 2")}>
            {product.description}
          </CardText>
          {hasVariationData && (
            <Flex flexWrap="wrap">
              {variationData.map((variation, index) => (
                <Flex key={index} mt={r("1 ---> 2")}>
                  <CardText fs={r("1.2rem ---> 1.4rem")} color="navys.1">
                    {variation.name}:
                  </CardText>
                  <CardText
                    mr={2}
                    ml={1}
                    fs={r("1.2rem ---> 1.4rem")}
                    color="greys.0"
                  >
                    {variation.option}
                  </CardText>
                </Flex>
              ))}
            </Flex>
          )}
          <Price price={product.price} shippingPrice={product.shippingPrice} />
        </Box>
        <Flex flexGrow={0} w="fit-content" mt={r("1 2")} alignItems="flex-end">
          <Icon
            h={3}
            onClick={() =>
              props.updateCart({
                update: {
                  product: props.product,
                  amount: -1,
                  variationsChosen: props.variationsChosen
                },
                brandId: props.brandId,
                productId: parseInt(props.product.id),
                demoCommissionId: parseInt(props.demoCommissionId)
              })
            }
          >
            <Minus />
          </Icon>
          <CardText ml={2} mr={2} fs={r("1.2rem ---> 1.6rem")}>
            {props.amount}
          </CardText>
          <Icon
            h={3}
            onClick={() =>
              props.updateCart({
                update: {
                  product: props.product,
                  amount: 1,
                  variationsChosen: props.variationsChosen
                },
                brandId: props.brandId,
                productId: parseInt(props.product.id),
                demoCommissionId: parseInt(props.demoCommissionId)
              })
            }
          >
            <Plus />
          </Icon>
        </Flex>
      </Flex>
    </Flex>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: payload => dispatch(updateCart(payload))
  };
}

const CheckoutCard = connect(
  null,
  mapDispatchToProps
)(_CheckoutCard);

export default CheckoutCard;
