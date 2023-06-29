import {createRoutesView} from "atomic-router-react";

import {HomePage} from "./home";
import {AnotherPage} from "./another";

import {Layout} from "./layout.tsx";

export const Pages = createRoutesView({
    routes: [HomePage, AnotherPage].map(r => ({...r, layout: Layout}))
})
