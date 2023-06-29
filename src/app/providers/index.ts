import compose from 'compose-function'

import {withStrictMode} from "./with-strict-mode.tsx";
import {withRouter} from "./with-router.tsx";

export const withProviders = compose(withStrictMode, withRouter)
