// import { action } from 'mobx';
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite';
import { createContext, useCallback } from 'react';
import {parseCookies} from "nookies";
// import {constants} from "../config";
// import {isMobileOnly} from 'mobile-device-detect';

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer)

let StoreContext = createContext();
let store;

function initializeData(initialData = store || {}) {
    const {
        something,
    } = initialData;
    let loadVideoTimeout;

    const cookies = parseCookies();
    return {
        something: null,
        doSomething: (str) => {
            store.something = str;
        }
    }
}

function InjectStoreContext({ children, initialData }) {
    store = useLocalObservable(() => initializeData(initialData));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export { InjectStoreContext, StoreContext, initializeData, store }
