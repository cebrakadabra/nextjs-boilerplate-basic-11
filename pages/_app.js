import React, {useContext} from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import {InjectStoreContext, StoreContext} from '../store';
import {sendWebVitals} from '../analytics';

require('../styles/main.less');


// module.hot.dispose event not being called on local dev causes css loss from time to time
// https://github.com/sheerun/extracted-loader/issues/11
if (module.hot) {
    module.hot.addStatusHandler(status => {
        if (typeof window !== "undefined" && status === "ready") {
            window.__webpack_reload_css__ = true;
        }
    });
}

// ==> NProgress
// === Show a progress bar on route chante ===
Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
})
Router.events.on('routeChangeComplete', (url) => {
    NProgress.done();
    // GA Page View
    window.gtag('config', publicRuntimeConfig.GA_ID, {
        page_path: url,
    })
});
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({showSpinner: false});

// ==> NProgress

function App({Component, pageProps}) {
    // If your page has Next.js data fetching methods returning a state for the Mobx store,
    // then you can hydrate it here.
    const getLayout = Component.getLayout || (page => page);

    return (
        <InjectStoreContext initialData={pageProps.initialStoreData} sessionData={pageProps.sessionStoreData}>
            {/*<GlobalSEOTags title={config.title} suffix={config.suffix} />*/}
            {getLayout(<Component {...pageProps} />)}
        </InjectStoreContext>
    )
}

export default App;

export function reportWebVitals(metric) {
    sendWebVitals(metric);
}
