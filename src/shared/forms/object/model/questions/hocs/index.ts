import compose from 'compose-function';

import { withOptions } from './with-options'
import { withRequires } from './with-requires';

export const hocs = compose(withOptions, withRequires);
