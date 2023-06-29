import {createHistoryRouter} from "atomic-router";
import {sample} from "effector";
import {createBrowserHistory} from "history";

import {routing} from "~/shared/config/routing";
import {appStarted} from "~/shared/config/init";

import {controls} from "./controls.ts";

export const router = createHistoryRouter({
    routes: routing,
    controls
})

sample({
    clock: appStarted,
    fn: () => createBrowserHistory(),
    target: router.setHistory
})
