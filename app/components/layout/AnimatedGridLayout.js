import GridLayout from './GridLayout';

const AnimatedGridLayout = GridLayout.extend`
  & > * {
    animation: rolling-cell linear 400ms forwards;
    transform-origin: right center;
    transform: rotateY(180deg) translateX(-100%);
    opacity: 0;
  }

  & >*:nth-child(1) {
    animation-delay: 50ms;
  }
  & >*:nth-child(2) {
    animation-delay: 100ms;
  }
  & >*:nth-child(3) {
    animation-delay: 150ms;
  }
  & >*:nth-child(4) {
    animation-delay: 200ms;
  }
  & >*:nth-child(5) {
    animation-delay: 250ms;
  }
  & >*:nth-child(6) {
    animation-delay: 300ms;
  }
  & >*:nth-child(7) {
    animation-delay: 350ms;
  }
  & >*:nth-child(8) {
    animation-delay: 400ms;
  }
  & >*:nth-child(9) {
    animation-delay: 450ms;
  }
  & >*:nth-child(10) {
    animation-delay: 500ms;
  }
  & >*:nth-child(11) {
    animation-delay: 550ms;
  }
  & >*:nth-child(12) {
    animation-delay: 600ms;
  }
  & >*:nth-child(13) {
    animation-delay: 650ms;
  }
  & >*:nth-child(14) {
    animation-delay: 700ms;
  }
  & >*:nth-child(15) {
    animation-delay: 750ms;
  }
  @keyframes rolling-cell {
    0% { transform: rotateY(180deg) translateX(-100%); opacity: 0;}
    30% { opacity: 0;}
    100% { transform: rotateY(0) scaleX(1) translateX(0); opacity: 1; }
    ${'' /* 0% { transform: rotateY(180deg) scaleX(0.3) translateX(-30%); opacity: 0;}
    100% { transform: rotateY(0) scaleX(1) translateX(0); opacity: 1; } */}
  }
`;

module.exports = AnimatedGridLayout;
