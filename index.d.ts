// Allow import images
declare module '*.jpg';
declare module '*.png';

declare module 'react-native-dotenv' {
  export const API_URL: string;
  export const API_SECRET: string;
}

declare module 'rn-material-ui-textfield' {
  import * as React from 'react';
  import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';

  export interface ContentInset {
    top?: number | undefined;
    label?: number | undefined;
    input?: number | undefined;
  }

  export interface TextFieldProps extends TextInputProps {
    animationDuration?: number | undefined;

    fontSize?: number | undefined;
    labelFontSize?: number | undefined;
    contentInset?: ContentInset | undefined;

    style?: StyleProp<TextStyle> | undefined;
    labelTextStyle?: StyleProp<TextStyle> | undefined;
    titleTextStyle?: StyleProp<TextStyle> | undefined;
    affixTextStyle?: StyleProp<TextStyle> | undefined;

    tintColor?: string | undefined;
    textColor?: string | undefined;
    baseColor?: string | undefined;

    label?: string | undefined;
    title?: string | undefined;

    characterRestriction?: number | undefined;

    error?: string | undefined;
    errorColor?: string | undefined;

    lineWidth?: number | undefined;
    activeLineWidth?: number | undefined;

    disabled?: boolean | undefined;

    disabledLineWidth?: number | undefined;

    clearTextOnFocus?: boolean | undefined;

    prefix?: string | undefined;
    suffix?: string | undefined;

    containerStyle?: StyleProp<ViewStyle> | undefined;
    inputContainerStyle?: StyleProp<ViewStyle> | undefined;

    onPress?(event: Event): void;
    onChangeText?(text: string): void;

    renderLeftAccessory?(): JSX.Element;
    renderRightAccessory?(): JSX.Element;

    lineType?: 'solid' | 'dotted' | 'dashed' | 'none' | undefined;
    disabledLineType?: 'solid' | 'dotted' | 'dashed' | 'none' | undefined;

    editable?: boolean | undefined;
    multiline?: boolean | undefined;

    formatText?(text: string): string;
    /**
     * Label position adjustment
     */
    labelOffset?: LabelOffset | undefined;
  }

  export interface LabelOffset {
    /**
     * Horizontal offset for inactive state
     */
    x0?: number | undefined;
    /**
     * Vertical offset for inactive state
     */
    y0?: number | undefined;
    /**
     * Horizontal offset for active state
     */
    x1?: number | undefined;
    /**
     * Vertical offset for active state
     */
    y1?: number | undefined;
  }

  /**
   * Material Style Text Field
   * @see https://github.com/n4kz/react-native-material-textfield/blob/master/src/components/field/index.js
   */
  export class TextField extends React.Component<TextFieldProps, any> {
    /*
     * Acquire focus
     */
    focus(): void;
    /*
     * Release focus
     */
    blur(): void;
    /*
     * Clear text field
     */
    clear(): void;
    /*
     * Get current value
     */
    value(): string;
    /*
     * Get current focus state
     */
    isFocused(): boolean;
    /*
     * Get current restriction state
     */
    isRestricted(): boolean;
    /*
     * Set current value
     */
    setValue(value?: string): void;
  }

  export class OutlinedTextField extends TextField {}
  export class FilledTextField extends TextField {}
}

declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  import {ScrollViewProps, FlatListProps, SectionListProps} from 'react-native';

  interface KeyboardAwareProps {
    /**
     * Catches the reference of the component.
     *
     *
     * @type {function}
     * @memberof KeyboardAwareProps
     */
    innerRef?: (ref: JSX.Element) => void;
    /**
     * Adds an extra offset that represents the TabBarIOS height.
     *
     * Default is false
     * @type {boolean}
     * @memberof KeyboardAwareProps
     */
    viewIsInsideTabBar?: boolean;

    /**
     * Coordinates that will be used to reset the scroll when the keyboard hides.
     *
     * @type {{
     *         x: number,
     *         y: number
     *     }}
     * @memberof KeyboardAwareProps
     */
    resetScrollToCoords?: {
      x: number;
      y: number;
    };

    /**
     * Lets the user enable or disable automatic resetScrollToCoords
     *
     * @type {boolean}
     * @memberof KeyboardAwareProps
     */
    enableResetScrollToCoords?: boolean;

    /**
     * When focus in TextInput will scroll the position
     *
     * Default is true
     *
     * @type {boolean}
     * @memberof KeyboardAwareProps
     */

    enableAutomaticScroll?: boolean;
    /**
     * Enables keyboard aware settings for Android
     *
     * Default is false
     *
     * @type {boolean}
     * @memberof KeyboardAwareProps
     */
    enableOnAndroid?: boolean;

    /**
     * Adds an extra offset when focusing the TextInputs.
     *
     * Default is 75
     * @type {number}
     * @memberof KeyboardAwareProps
     */
    extraHeight?: number;

    /**
     * Adds an extra offset to the keyboard.
     * Useful if you want to stick elements above the keyboard.
     *
     * Default is 0
     *
     * @type {number}
     * @memberof KeyboardAwareProps
     */
    extraScrollHeight?: number;

    /**
     * Sets the delay time before scrolling to new position
     *
     * Default is 250
     *
     * @type {number}
     * @memberof KeyboardAwareProps
     */
    keyboardOpeningTime?: number;

    /**
     * Callback when the keyboard will show.
     *
     * @param frames Information about the keyboard frame and animation.
     */
    onKeyboardWillShow?: (frames: Object) => void;

    /**
     * Callback when the keyboard did show.
     *
     * @param frames Information about the keyboard frame and animation.
     */
    onKeyboardDidShow?: (frames: Object) => void;

    /**
     * Callback when the keyboard will hide.
     *
     * @param frames Information about the keyboard frame and animation.
     */
    onKeyboardWillHide?: (frames: Object) => void;

    /**
     * Callback when the keyboard did hide.
     *
     * @param frames Information about the keyboard frame and animation.
     */
    onKeyboardDidHide?: (frames: Object) => void;

    /**
     * Callback when the keyboard frame will change.
     *
     * @param frames Information about the keyboard frame and animation.
     */
    onKeyboardWillChangeFrame?: (frames: Object) => void;

    /**
     * Callback when the keyboard frame did change.
     *
     * @param frames Information about the keyboard frame and animation.
     */
    onKeyboardDidChangeFrame?: (frames: Object) => void;
  }

  interface KeyboardAwareScrollViewProps
    extends KeyboardAwareProps,
      ScrollViewProps {}
  interface KeyboardAwareFlatListProps<ItemT>
    extends KeyboardAwareProps,
      FlatListProps<ItemT> {}
  interface KeyboardAwareSectionListProps<ItemT>
    extends KeyboardAwareProps,
      SectionListProps<ItemT> {}

  interface KeyboardAwareState {
    keyboardSpace: number;
  }

  class ScrollableComponent<P, S> extends React.Component<P, S> {
    getScrollResponder: () => void;
    scrollToPosition: (x: number, y: number, animated?: boolean) => void;
    scrollToEnd: (animated?: boolean) => void;
    scrollForExtraHeightOnAndroid: (extraHeight: number) => void;
    scrollToFocusedInput: (
      reactNode: Object,
      extraHeight?: number,
      keyboardOpeningTime?: number,
    ) => void;
  }

  export class KeyboardAwareMixin {}
  export class KeyboardAwareScrollView extends ScrollableComponent<
    KeyboardAwareScrollViewProps,
    KeyboardAwareState
  > {}
  export class KeyboardAwareFlatList extends ScrollableComponent<
    KeyboardAwareFlatListProps<any>,
    KeyboardAwareState
  > {}
  export class KeyboardAwareSectionList extends ScrollableComponent<
    KeyboardAwareSectionListProps<any>,
    KeyboardAwareState
  > {}
}
