import {
  Dispatch,
  forwardRef,
  LegacyRef,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Dimensions, StyleProp, Text, TextInput, ViewStyle} from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
  AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';
import colors from '../../assets/colors';
import {IconChevronDown, IconCircleX} from 'tabler-icons-react-native';

const DropdownTextInput = ({
  setSelect,
  data,
  selected,
  headerOffset,
  placeHolder = '...',
  suggestionStyle = {},
  onOpenSuggestionsList = async () => {},
  loading,
}: {
  setSelect: Dispatch<SetStateAction<any>>;
  data: {id: string; title: string}[];
  selected: string;
  headerOffset: number;
  placeHolder?: string;
  suggestionStyle?: StyleProp<ViewStyle>;
  onOpenSuggestionsList?: (isOpened: boolean) => void;
  loading?: boolean;
}) => {
  const dropdownController = useRef<null | AutocompleteDropdownRef>(null);
  const searchRef = useRef<null | TextInput>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onOpenSuggestionsListHandler = useCallback(
    async (isOpened: boolean) => {
      isOpened ? setIsOpen(true) : setIsOpen(false);
      onOpenSuggestionsList(isOpened);
    },
    [],
  );

  useEffect(() => {
    if (isOpen) {
      dropdownController.current?.close();
      dropdownController.current?.open();
    }
  }, [headerOffset]);
  return (
    <AutocompleteDropdown
      ref={searchRef}
      controller={controller => {
        dropdownController.current = controller;
      }}
      direction="down"
      clearOnFocus={false}
      dataSet={data}
      closeOnBlur
      onSelectItem={value => value && setSelect(value.id)}
      initialValue={selected}
      suggestionsListMaxHeight={200}
      suggestionsListTextStyle={{
        margin: 0,
      }}
      loading={loading}
      onOpenSuggestionsList={onOpenSuggestionsListHandler}
      renderItem={(item, text) => (
        <Text className="text-primary font-sourceSansProSemiBold p-[15px] text-base">
          {item.title}
        </Text>
      )}
      // useFilter={false} // set false to prevent rerender twice
      textInputProps={{
        placeholder: placeHolder,
        autoCorrect: false,
        autoCapitalize: 'none',
        placeholderTextColor: colors.secondary,
        style: {
          borderRadius: 6,
          backgroundColor: colors.border,
          color: colors.primary,
          paddingLeft: 18,
          fontFamily: 'SourceSansProSemiBold',
        },
      }}
      rightButtonsContainerStyle={{
        right: 0,
        paddingRight: 10,
        backgroundColor: colors.border,
        borderRadius: 6,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
      suggestionsListContainerStyle={{
        backgroundColor: colors.border,
        width: Dimensions.get('window').width * 0.92,
        marginLeft: -8,
        marginTop: 0,
        zIndex: 50,
        ...(suggestionStyle as object),
      }}
      containerStyle={{flexGrow: 1, flexShrink: 1}}
      ChevronIconComponent={
        <IconChevronDown size={23} color={colors.secondary} />
      }
      ClearIconComponent={<IconCircleX size={20} color={colors.secondary} />}
      onClear={() => {
        setSelect('');
      }}
    />
  );
};

export default DropdownTextInput;