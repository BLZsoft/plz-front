import {FC, PropsWithChildren, useEffect} from "react";
import {Link} from "atomic-router-react";

import {routes} from "~/shared/lib/routes";

export const Layout: FC<PropsWithChildren> = ({children}) => {
    useEffect(() => {
        console.log("Layout mounted")
    }, [])

    return <>
        <header>Some header <Link to={routes.another}>Go To another</Link></header>
        {children}
    </>
}
