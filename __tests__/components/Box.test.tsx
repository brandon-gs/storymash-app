/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Box} from 'components';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Box renders correctly', () => {
  renderer.create(<Box />);
});
