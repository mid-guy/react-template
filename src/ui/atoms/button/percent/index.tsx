import { ButtonProps } from "../root";
import { withComponent } from "../../../hoc/withComponent";
import ButtonV2 from "../root/v2";

const PercentButton = withComponent<ButtonProps>(ButtonV2, () => ({
  children: <span>%</span>,
}));
PercentButton.displayName = "PercentButton";
export default PercentButton;