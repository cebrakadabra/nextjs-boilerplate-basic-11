import React from 'react';
import axios from 'axios';
import getConfig from "next/config";

import {StoreContext} from "../store";
import {constants} from "../config";

require('./Layout.less');

// const {publicRuntimeConfig} = getConfig();

function Layout({session, pageType, seoObj, slug, children}) {
    const store = React.useContext(StoreContext);

    return (
        <>
            <div className={`site-wrapper pageType-${pageType}`}>
                <main>{children}</main>
            </div>
        </>
    )
}

export const getLayout = (page) => {
    const {props: {slug}, children} = page;

    return (
        <Layout slug={slug} children={children}>
            {page}
        </Layout>
    )
};
export default Layout
