import { ButtonProps } from "../root";
import { withComponent } from "../../../hoc/withComponent";
import ButtonV2 from "../root/v2";

const PixelButton = withComponent<ButtonProps>(ButtonV2, () => ({
  children: <span>px</span>,
}));
PixelButton.displayName = "PixelButton";
export default PixelButton;