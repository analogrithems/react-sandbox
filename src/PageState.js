let store;

if (__SERVER__) {
    const getNamespace = require('continuation-local-storage').getNamespace;

    store = {
        get(key) {
            return getNamespace('PageState').get(key);
        },
        set(key, val) {
            return getNamespace('PageState').set(key, val);
        }
    };
} else {
    store = (function() {
        const state = {};

        return {
            get(key) {
                return state[key];
            },
            set(key, val) {
                state[key] = val;
            }
        };
    })();
}

function deepClone(obj) {
    const _obj = JSON.parse(JSON.stringify(obj));

    return _obj;
}

/**\

title: PageState
category: service
description:
Keeps the state as a json object between the client
and the server. In conjunction with continuation-local storage,
this is a magic dumping ground for syncing stores and
simulating singletons for the page

\**/
class PageState {
    constructor() {
        if (typeof window === 'undefined') {
            return;
        }

        if (!window.PageState) {
            return;
        }

        this.load(window.PageState);
    }

    register(key, cb) {
        const data = store.get('data') || {},
            channel = store.get('channel') || {};

        if (typeof cb !== 'function') {
            return;
        }

        if (!channel.hasOwnProperty(key)) {
            channel[key] = [];
        }

        channel[key].push(cb);
        store.set('channel', channel);

        if (data.hasOwnProperty(key)) {
            cb(deepClone(data[key]));
        }
    }

    load(data) {
        const _data = JSON.parse(data);
        let ni;

        for (ni in _data) {
            this.populate(ni, _data[ni], true);
        }
    }

    populate(key, data, cancelFresh) {
        const _data = store.get('data') || {},
            channel = store.get('channel') || {},
            fresh = store.get('fresh') || {};
        let ni;

        _data[key] = deepClone(data);


        if (!cancelFresh) {
            fresh[key] = Date.now();
        }

        store.set('data', _data);
        store.set('fresh', fresh);

        if (!channel.hasOwnProperty(key)) {
            return;
        }

        for (ni = 0; ni < channel[key].length; ni++) {
            channel[key][ni](deepClone(data));
        }
    }

    get(key) {
        const data = store.get('data') || {};

        return deepClone(data[key] || {});
    }

    freshness(key) {
        const data = store.get('fresh') || {};

        return data[key] || 0;
    }

    out() {
        return JSON.stringify(store.get('data') || {})
            .replace(/\n/g, '\\n')
            .replace(/\\n/g, '\\\\n')
            .replace(/'/g, '\\\'');
    }
}

const outer = new PageState();

if (__CLIENT__) {
    outer.load(window.PageState);
    window.PageState = outer;
}

export default outer;