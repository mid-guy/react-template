import { ButtonProps } from "../root";
import { withComponent } from "../../../hoc/withComponent";
import incrementSVG from '../../../../assets/svg/increment.svg';
import ButtonV1 from "../root/v1";

const IncrementButton = withComponent<ButtonProps>(ButtonV1, (props) => ({
  children: <img src={incrementSVG} alt="increment-svg-icon" />,
  disabled: props.disabled,
}));

IncrementButton.displayName = "IncrementButton";

export default IncrementButton;