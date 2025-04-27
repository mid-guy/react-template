import Button, { ButtonProps } from "../root";
import { withComponent } from "../../../hoc/withComponent";

const ButtonV2 = withComponent<ButtonProps>(Button, () => ({
  className: "w-[67px] h-[32px] p-2 bg-[#212121] hover:bg-[#424242] transition-all duration-150 rounded-[4px]",
}));
ButtonV2.displayName = "ButtonV2";
export default ButtonV2;