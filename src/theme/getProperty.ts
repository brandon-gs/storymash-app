import {Colors, Theme} from 'react-native-elements';
import {alignKeys, marginKeys, paddingKeys, Spacing} from './constants';
import memoize from './memoize';
import merge from './merge';

type RecursivePartial<T> = {[P in keyof T]?: RecursivePartial<T[P]>};

const properties: Record<string, string> = {
  m: 'margin',
  p: 'padding',
  mx: 'marginHorizontal',
  my: 'marginVertical',
};

const directions: Record<string, string | Array<string>> = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

const aliases: Record<string, string> = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py',
};

const aliasesProperties: Record<string, string> = {
  justify: 'justifyContent',
  direction: 'flexDirection',
  bg: 'backgroundColor',
  bgTheme: 'backgroundColor',
  backgroundColorTheme: 'backgroundColor',
  colorTheme: 'color',
  fsize: 'fontSize',
};

// memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec
const getCssProperties = memoize((prop: string) => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction)
    ? direction.map(dir => property + dir)
    : [property + direction];
});

export function getValue(propValue: string | number) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }

  const abs = Math.abs(propValue);
  const transformed = abs;

  if (propValue >= 0) {
    return transformed * Spacing;
  }

  if (typeof transformed === 'number') {
    return -transformed * Spacing;
  }

  return `-${transformed}`;
}

export function getStyleFromPropValue(cssProperties: Array<string>) {
  return (propValue: number | string) =>
    cssProperties.reduce(
      (acc: Record<string, string | number>, cssProperty: string) => {
        acc[cssProperty] = getValue(propValue);
        return acc;
      },
      {},
    );
}

function resolveCssProperty(props: any, keys: Array<string>, prop: string) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (keys.indexOf(prop) === -1) {
    return null;
  }

  const cssProperties = getCssProperties(prop);

  const styleFromPropValue = getStyleFromPropValue(cssProperties);
  const propValue: number = props[prop];

  return styleFromPropValue(propValue);
}

function style(props: Object, keys: Array<string>) {
  return Object.keys(props)
    .map(prop => {
      return resolveCssProperty(props, keys, prop);
    })
    .reduce(merge, {});
}

export function margin(props: Object) {
  return style(props, marginKeys);
}

export function padding(props: Object) {
  return style(props, paddingKeys);
}

function getCssPropertyFromDict(prop: string) {
  const isValidInDict = aliasesProperties.hasOwnProperty(prop);
  const cssProperties = [];
  if (isValidInDict) {
    cssProperties.push(aliasesProperties[prop]);
  } else {
    cssProperties.push(prop);
  }
  return cssProperties;
}

function styleAlignment(props: any, keys: Array<string>) {
  return Object.keys(props)
    .map(prop => {
      // Using a hash computation over an array iteration could be faster, but with only 28 items,
      // it's doesn't worth the bundle size.
      if (keys.indexOf(prop) === -1) {
        return null;
      }
      const cssProperties = getCssPropertyFromDict(prop);
      const styleFromPropValue = getStyleFromPropValue(cssProperties);
      const propValue = props[prop];

      return styleFromPropValue(propValue);
    })
    .reduce(merge, {});
}

function styleColorTheme(props: any, keys: Array<string>, theme?: Theme) {
  return Object.keys(props)
    .map(prop => {
      // Using a hash computation over an array iteration could be faster, but with only 28 items,
      // it's doesn't worth the bundle size.
      if (keys.indexOf(prop) === -1) {
        return null;
      }
      const cssProperties = getCssPropertyFromDict(prop);
      const styleFromPropValue = getStyleFromPropValue(cssProperties);
      const propValue: any = props[prop];

      if (theme && theme.colors && theme.colors.hasOwnProperty(propValue)) {
        const key: keyof RecursivePartial<Colors> = propValue;
        const colorValue = theme.colors[key];
        if (typeof colorValue === 'string') {
          return styleFromPropValue(colorValue);
        }
      }

      return styleFromPropValue(propValue);
    })
    .reduce(merge, {});
}

function styleSizeTheme(props: any, keys: Array<string>) {
  return Object.keys(props)
    .map(prop => {
      // Using a hash computation over an array iteration could be faster, but with only 28 items,
      // it's doesn't worth the bundle size.
      if (keys.indexOf(prop) === -1) {
        return null;
      }
      const cssProperties = getCssPropertyFromDict(prop);
      const styleFromPropValue = getStyleFromPropValue(cssProperties);
      const propValue: any = props[prop];

      return styleFromPropValue(propValue);
    })
    .reduce(merge, {});
}

/**
 * TODO: Cambiar nombre de la funcion styleAlignment y del diccionario o crear uno para colores mejorando el rendimiento
 * solo cambiar el nombre de style alignment y crear otro diccionaro
 * crear los tipos de los objetos de flex y color para que se puedan agregar en las props de Box
 * ejemplo: <Box bg="test" backgroundColor="test" />
 */

export function alignment(props: Object) {
  return styleAlignment(props, alignKeys);
}

export function flex(props: Object) {
  return styleAlignment(props, ['direction', 'flexDirection']);
}

export function color(props: Object, theme?: Theme) {
  return styleColorTheme(
    props,
    [
      'bg',
      'bgTheme',
      'backgroundColorTheme',
      'backgroundColor',
      'color',
      'colorTheme',
    ],
    theme,
  );
}

export function size(props: Object) {
  return styleSizeTheme(props, ['fontSize', 'fsize']);
}
