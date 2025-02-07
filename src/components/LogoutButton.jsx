import { TouchableOpacity } from "react-native";
import { LogoutIcon } from "../../assets/icons";

const LogoutButton = ({ style, onPress }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <LogoutIcon width={24} height={24} />
    </TouchableOpacity>
  );
};

export default LogoutButton;
