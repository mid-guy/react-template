import { ButtonProps } from "../root";
import { withComponent } from "../../../hoc/withComponent";
import decrementSVG from '../../../../assets/svg/decrement.svg';
import ButtonV1 from "../root/v1";
const DecrementButton = withComponent<ButtonProps>(ButtonV1, (props) => ({
  children: <img src={decrementSVG} alt="increment-svg-icon" />,
  disabled: props.disabled,
}));
DecrementButton.displayName = "DecrementButton";
export default DecrementButton;