import {TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  IconDotsVertical,
  IconEditCircle,
  IconInfoCircle,
  IconTrash,
} from 'tabler-icons-react-native';
import colors from '../../../assets/colors';

export type PopUpMenuProps = {
  onEdit?: () => void;
  onDetail?: () => void;
  onDelete?: () => void;
  iconEdit?: JSX.Element;
  iconDetail?: JSX.Element;
  iconDelete?: JSX.Element;
};

const PopUpMenu = ({
  onEdit,
  onDelete,
  onDetail,
  iconDelete,
  iconDetail,
  iconEdit,
}: PopUpMenuProps) => {
  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
        }}
        style={{
          marginRight: -4,
          marginLeft: 4,
        }}>
        <IconDotsVertical size={20} color={colors.secondary} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsWrapper: {
            position: 'absolute',
            right: 20,
            backgroundColor: 'white',
            display: 'flex',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            elevation: 3,
            shadowColor: colors.accent,
            flexDirection: 'row',
            // top: 10,
            alignContent: 'center',
            columnGap: 5,
          },
        }}>
        {onDetail && (
          <MenuOption
            customStyles={{OptionTouchableComponent: TouchableOpacity}}
            onSelect={onDetail}>
            {iconDetail || <IconInfoCircle color={colors.accent} />}
          </MenuOption>
        )}
        {onEdit && (
          <MenuOption
            onSelect={onEdit}
            customStyles={{OptionTouchableComponent: TouchableOpacity}}>
            {iconEdit || <IconEditCircle color={colors.success} />}
          </MenuOption>
        )}
        {onDelete && (
          <MenuOption
            onSelect={onDelete}
            customStyles={{OptionTouchableComponent: TouchableOpacity}}>
            {iconDelete || <IconTrash color={colors.err} />}
          </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default PopUpMenu;
