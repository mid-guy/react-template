import Button, { ButtonProps } from "../root";
import { withComponent } from "../../../hoc/withComponent";

const ButtonV1 = withComponent<ButtonProps>(Button, () => ({
  className: "w-[34px] h-[34px] p-2 hover:bg-[#3B3B3B] transition-all duration-150",
}));
ButtonV1.displayName = "ButtonV1";
export default ButtonV1;