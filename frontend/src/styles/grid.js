// Import styled-components library
import {styled as sc} from styled-components
import { css } from styled-components

// Cache container
const container = document.querySelector('.container');

// Helper function to convert pixels to rems
const remy = (px) => `${px / 16}rem`;

// Function for calculating value for width
const getWidth = (value) => {
  if (!value) return;

  let width = (value / 12) * 100;
  return `width: ${width}%;`;
};

// Function for calculating value for flex
const getFlex = (value) => {
  if (!value) return;

  let flex = (value / 12) * 100;
  return `flex: 0 0 ${flex}%;`;
};

const LayoutWrapper = sc.div`
  padding-top: 32px;
  padding-bottom: 32px;

  // Fix for applying proper box-sizing
  html:not(&) {
    box-sizing: border-box;

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  body:not(&) {
    font: 16px / 1.618 Arial, Verdana, sans-serif;
  }
`;

// Grid container
const GridContainer = sc.div`
  padding-right: ${remy(15)};
  padding-left: ${remy(15)};
  margin-right: auto;
  margin-left: auto;
  width: 100%;

  // Breakpoint for tablets
  @media (min-width: 576px) {
    max-width: ${remy(540)};
  }

  // Breakpoint for small desktops
  @media (min-width: 768px) {
    max-width: ${remy(720)};
  }

  // Breakpoint for medium desktops
  @media (min-width: 992px) {
    max-width: ${remy(9600)};
  }

  // Breakpoint for large desktops and HD devices
  @media (min-width: 1200px) {
    max-width: ${remy(1140)};
  }
`;

// Grid row
const GridRow = sc.div`
  margin-right: ${remy(-15)};
  margin-left: ${remy(-15)};
  display: flex;
  flex-wrap: wrap;
`;

// Grid columns
const GridColumn = sc.div`
  padding-right: ${remy(15)};
  padding-left: ${remy(15)};

  // Columns for mobile
  ${({ xs }) => (xs ? getFlex(xs) : 'flex: 0 0 100%')};
  ${({ xs }) => (xs ? getWidth(xs) : 'width: 100%')};

  // Columns for tablets
  @media (min-width: 576px) {
    ${({ sm }) => sm && getFlex(sm)};
    ${({ sm }) => sm && getWidth(sm)};
  }

  // Columns for small desktops
  @media (min-width: 768px) {
    ${({ md }) => md && getFlex(md)};
    ${({ md }) => md && getWidth(md)};
  }

  // Columns for medium desktops
  @media (min-width: 992px) {
    ${({ lg }) => lg && getFlex(lg)};
    ${({ lg }) => lg && getWidth(lg)};
  }

  // Columns for large desktops and HD devices
  @media (min-width: 1200px) {
    ${({ xl }) => xl && getFlex(xl)};
    ${({ xl }) => xl && getWidth(xl)};
  }
`;

// Flipping card
const Card = sc.article`
  position: relative;
  width: 100%;
  min-height: ${remy(380)};
  cursor: pointer;
  perspective: 1000px;
  transition: all .25s ease-in-out;

  &:focus,
  &:hover {
    box-shadow: 0 0 ${remy(40)} rgba(0,0,0,.15);
  }

  &.flipped {
    & > div:first-of-type { // Front side of the card
      transform: perspective(1000px) rotateY(-180deg);
    }

    & > div:last-of-type { // Back side of the card
      transform: perspective(1000px) rotateY(0deg);
    }
  }
`;

// Card sides
const CardSide = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  padding: ${remy(24)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: all 0.25s ease-in-out;
`;

// Card side - front
const CardFront = sc.div`
  ${CardSide};

  font-weight: bold;
  text-align: center;
`;

// Card side - back
const CardBack = sc.div`
  ${CardSide};

  transform: rotateY(-180deg);
`;

// Card content
const CardNumber = sc.span`
  display: block;
  font-size: ${remy(24)};
`;

const CardTitle = sc.h2`
  font-size: ${remy(21)};
`;

const CardDescription = sc.span`
  font-size: ${remy(16)};
`;

// Create layout component
class Layout extends React.Component {
  flipCard(event) {
    event.currentTarget.classList.toggle('flipped');
  }

  render() {
    return (
      <LayoutWrapper>
        <GridContainer>
          <GridRow>
            <GridColumn sm='6' lg='4'>
              <Card onClick={this.flipCard.bind(this)}>
                <CardFront>
                  <CardNumber>1.</CardNumber>

                  <CardTitle>Card</CardTitle>
                </CardFront>

                <CardBack>
                  <CardDescription>
                    Rand's stated goal for writing the novel was "to show how
                    desperately the world needs prime movers and how viciously
                    it treats them" and to portray "what happens to the world
                    without them".
                  </CardDescription>
                </CardBack>
              </Card>
            </GridColumn>

            <GridColumn sm='6' lg='4'>
              <Card onClick={this.flipCard.bind(this)}>
                <CardFront>
                  <CardNumber>2.</CardNumber>

                  <CardTitle>Card</CardTitle>
                </CardFront>

                <CardBack>
                  <CardDescription>
                    The core idea for the book came to her after a 1943
                    telephone conversation with a friend, who asserted that Rand
                    owed it to her readers to write fiction about her
                    philosophy.
                  </CardDescription>
                </CardBack>
              </Card>
            </GridColumn>

            <GridColumn sm='6' lg='4'>
              <Card onClick={this.flipCard.bind(this)}>
                <CardFront>
                  <CardNumber>3.</CardNumber>

                  <CardTitle>Card</CardTitle>
                </CardFront>

                <CardBack>
                  <CardDescription>
                    To produce Atlas Shrugged, Rand conducted research on the
                    American railroad industry. Her previous work on a proposed
                    (but never realized) screenplay.
                  </CardDescription>
                </CardBack>
              </Card>
            </GridColumn>

            <GridColumn sm='6' lg='4'>
              <Card onClick={this.flipCard.bind(this)}>
                <CardFront>
                  <CardNumber>4.</CardNumber>

                  <CardTitle>Card</CardTitle>
                </CardFront>

                <CardBack>
                  <CardDescription>
                    Atlas Shrugged is set in a dystopian United States at an
                    unspecified time, in which the country has a "National
                    Legislature" instead of Congress and a "Head of State"
                    instead of a President.
                  </CardDescription>
                </CardBack>
              </Card>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </LayoutWrapper>
    );
  }
}

// Render Layout React element into the DOM
ReactDOM.render(<Layout />, container);
