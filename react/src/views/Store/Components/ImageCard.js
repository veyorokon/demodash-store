import React from "react";
import {Box, Svg, Flex, Text, DropDown, CallToActionButton} from "components";
import {responsive as r, getToken} from "lib";
import {Card} from "views/Store/Components";
import SwipeableViews from "react-swipeable-views";
import styled, {css} from "styled-components";
import {connect} from "react-redux";
import {API_MEDIA} from "api";
import {updateCart} from "redux/actions";

const NavigationBullet = styled(Flex)`
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;
  background: grey;
  border-radius: 50%;
  flex-grow: 0;
  border: 5px solid transparent;

  ${props =>
    props.active &&
    css`
      color: black;
      font-weight: 600;
      background: black;
    `}
`;

const PanelNavigation = styled(Flex)`
  width: fit-content;
  align-self: center;
  flex-grow: 0;
  height: fit-content;
  color: black;
  & > ${NavigationBullet} {
    margin-right: 1rem;
  }
  & > :last-child {
    margin-right: 0;
  }
`;

const BackgroundImage = styled(Box)`
  background: url(${props => props.image});
  height: 0;
  position: relative;
  padding-bottom: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;

function checkIfStartsVowel(word) {
  const vowels = "aeio";
  if (vowels.includes(word[0])) return true;
  return false;
}

const _CardButton = props => (
  <CallToActionButton
    hoverBackground="#FFC651"
    cursor="pointer"
    br={2}
    mt={2}
    bg={"yellows.1"}
    w="100%"
    onClick={() => {
      if (props.callback())
        props.updateCart({
          demoCommissionId: parseInt(props.demoCommission.id),
          amount: 1
        });
    }}
    {...props}
  >
    <Text ml="auto" mr="auto">
      {props.children}
    </Text>
  </CallToActionButton>
);

function mapDispatchToProps(dispatch) {
  return {
    updateCart: payload => dispatch(updateCart(payload))
  };
}

const CardButton = connect(
  null,
  mapDispatchToProps
)(_CardButton);

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index || 0,
      missingVariations: [],
      variationChoices: {}
    };
  }

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  getVariationOptions = variation => {
    let options = [];
    for (var indx in variation.options) {
      let option = variation.options[indx];
      options.push({text: option.option, value: option.id});
    }
    return options;
  };

  mapVariationToImageIndex = variationId => {
    let images = this.props.images;
    for (var indx in images) {
      let image = images[indx];
      let variationOption = image.variationOption;
      if (variationOption !== null && variationOption.id === variationId) {
        return indx;
      }
    }
    return null;
  };

  checkVariationImage = evt => {
    let index = this.mapVariationToImageIndex(evt.target.value);
    if (index) return this.setState({index: parseInt(index)});
  };

  deleteProductMutation = deleteProduct => {
    const {productId, currentAccountUser} = this.props;
    return deleteProduct({
      variables: {
        token: getToken().token,
        accountUserId: parseInt(currentAccountUser),
        productId: parseInt(productId)
      }
    });
  };

  updateVariationChoice = (variation, choice) => {
    let variationChoices = this.state.variationChoices;
    let missingVariations = this.state.missingVariations;
    if (choice !== "-1") {
      variationChoices[variation.id] = parseInt(choice);
      //Remove variation from missing variations
      missingVariations = missingVariations.filter(item =>
        missingVariations.every(item2 => item2 !== parseInt(variation.id))
      );
    } else {
      delete variationChoices[parseInt(variation.id)];
      // missingVariations = [parseInt(variation.id)];
    }
    this.setState({
      variationChoices: {
        ...variationChoices
      },
      missingVariations: [...missingVariations]
    });
  };

  checkHasAllVariations = () => {
    const {props} = this;
    const {variationChoices} = this.state;
    let missingVariations = [];
    props.variations.forEach(function(variation) {
      let variationId = parseInt(variation.id);
      if (!variationChoices[variationId]) {
        missingVariations.push(variationId);
      }
    });
    if (missingVariations.length) {
      this.setState({
        missingVariations: [...missingVariations]
      });
      return false;
    }
    return true;
  };

  render() {
    const {props} = this;
    const {index} = this.state;
    console.log(this.state);
    return (
      <Card
        p={3}
        mr={2}
        ml={2}
        mt={3}
        mb={3}
        bg={"whites.0"}
        h="fit-content"
        br={2}
        {...props}
      >
        <SwipeableViews
          index={index}
          onChangeIndex={indx => this.handleChangeIndex(indx)}
        >
          {props.images.map((image, indx) => (
            <BackgroundImage
              key={indx}
              mt="auto"
              mb={props.images.length > 1 ? 0 : 2}
              br={1}
              w={"100%"}
              image={API_MEDIA + image.image}
            />
          ))}
        </SwipeableViews>
        {props.images.length > 1 && (
          <PanelNavigation mt={2} mb={2}>
            {props.images.map((image, indx) => (
              <NavigationBullet
                alignItems="center"
                justifyContent="center"
                w={r("1rem")}
                h={r("1rem")}
                onClick={() => this.handleChangeIndex(indx)}
                color={"blacks.0"}
                key={indx}
                active={index === indx}
              />
            ))}
          </PanelNavigation>
        )}

        <Flex flexDirection="column" justifyContent="flex-start">
          {props.brand && (
            <Flex mt={2} mb={2} alignItems="center">
              {props.brandIcon && (
                <Svg
                  mr={2}
                  w={"2.8rem"}
                  h={"2.8rem"}
                  src={API_MEDIA + props.brandIcon}
                />
              )}
              <Text letterSpacing="0.5px" color={"greys.0"} fw={400} w={"100%"}>
                {props.brand}
              </Text>
            </Flex>
          )}
          <Text
            mt="2"
            letterSpacing="0.5px"
            color={"navys.0"}
            mb={2}
            fw={600}
            w={"100%"}
          >
            {props.title}
          </Text>
          <Text
            letterSpacing="0.5px"
            color={"navys.0"}
            mb={2}
            fw={300}
            w={"100%"}
          >
            {props.description}
          </Text>
        </Flex>
        {props.variations &&
          props.variations.map((variation, indx) => {
            let avAn = checkIfStartsVowel(variation.name);
            const isMissing = this.state.missingVariations.includes(
              parseInt(variation.id)
            );

            return (
              <Flex
                flexGrow={0}
                flexDirection="column"
                key={`variation-${indx}`}
              >
                <Flex>
                  <Text letterSpacing="0.5px" color={"navys.0"} mb={2} fw={500}>
                    {variation.name}:
                  </Text>
                  {isMissing && (
                    <Text
                      letterSpacing="0.5px"
                      color={"oranges.0"}
                      mb={2}
                      ml={2}
                      fw={400}
                    >
                      Please choose {avAn ? "an" : "a"}{" "}
                      {variation.name.toLowerCase()}
                    </Text>
                  )}
                </Flex>
                <DropDown
                  mb={2}
                  options={this.getVariationOptions(variation)}
                  onChange={evt => {
                    this.checkVariationImage(evt);
                    this.updateVariationChoice(variation, evt.target.value);
                  }}
                  br={2}
                  maxWidth="100%"
                  w="100%"
                  borderColor={isMissing ? "oranges.0" : "lightslategrey"}
                  defaultOption={`Choose ${
                    avAn ? "an" : "a"
                  } ${variation.name.toLowerCase()}`}
                />
              </Flex>
            );
          })}
        <Flex flexGrow={0} mt={1} mb={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Price:
          </Text>
          <Flex alignItems="center">
            <Text letterSpacing="0.5px" color={"reds.1"} fw={500}>
              ${props.price.toFixed(2)}
            </Text>
            <Text
              ml={1}
              letterSpacing="0.5px"
              color={"navys.0"}
              fw={500}
              fs={"1.2rem"}
            >
              &#43;
            </Text>
            <Text
              letterSpacing="0.5px"
              color={"navys.1"}
              fw={500}
              ml={1}
              fs={"1.2rem"}
              h="fit-content"
            >
              {props.shippingPrice
                ? `$${props.shippingPrice.toFixed(2)}`
                : "FREE"}
            </Text>
            <Text
              ml={1}
              letterSpacing="0.5px"
              color={"navys.1"}
              fw={500}
              fs={"1.2rem"}
              h="fit-content"
            >
              Shipping
            </Text>
          </Flex>
        </Flex>
        <CardButton
          callback={this.checkHasAllVariations}
          demoCommission={props.demoCommission}
        >
          Add to cart
        </CardButton>
      </Card>
    );
  }
}
