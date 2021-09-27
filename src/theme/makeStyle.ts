import {Theme} from 'react-native-elements';
import {alignment, margin, padding, flex, color, size} from './getProperty';

export function makeStyle<ReturnType>(
  props: Object,
  theme?: Theme,
): ReturnType {
  return {
    ...alignment(props),
    ...margin(props),
    ...padding(props),
    ...flex(props),
    ...color(props, theme),
    ...size(props),
  } as ReturnType;
}
export default makeStyle;
