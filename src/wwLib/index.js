import emitter from 'tiny-emitter/instance';
import services from './services/index.js';
import { useIconsStore } from '@/pinia/icons';

 /* wwFront:start */
// eslint-disable-next-line no-undef
import plugin_f9ef41c3_1c53_4857_855b_f2f6a40b7186 from '@/components/plugins/plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186/src/wwPlugin.js';
import plugin_1fa0dd68_5069_436c_9a7d_3b54c340f1fa from '@/components/plugins/plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa/src/wwPlugin.js';
import plugin_00d22f72_1a03_44f8_ad68_c593dc80b543 from '@/components/plugins/plugin-00d22f72-1a03-44f8-ad68-c593dc80b543/src/wwPlugin.js';
import plugin_2bd1c688_31c5_443e_ae25_59aa5b6431fb from '@/components/plugins/plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb/src/wwPlugin.js';
import plugin_6a64802c_52f8_4637_9932_580bf178aaa7 from '@/components/plugins/plugin-6a64802c-52f8-4637-9932-580bf178aaa7/src/wwPlugin.js';
import plugin_fbf0feec_356b_461b_8738_3b1f44edaf02 from '@/components/plugins/plugin-fbf0feec-356b-461b-8738-3b1f44edaf02/src/wwPlugin.js';
import plugin_9c40819b_4a8f_468f_9ba5_4b9699f3361f from '@/components/plugins/plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f/src/wwPlugin.js';
/* wwFront:end */

import { computed, reactive } from 'vue';

export default {
    ...services,
     $on(event, fn) {
        emitter.on(event, fn);
    },
    $once(event, fn) {
        emitter.once(event, fn);
    },
    $emit(event, ...args) {
        if (!event) {
            return;
        }
        emitter.emit(event, ...args);
    },
    $off(event, fn) {
        emitter.off(event, fn);
    },
     front: {},
    $focus: null,
    env: process.env.NODE_ENV,
    async initFront({ router, store }) {
 
        this.front.router = router;
        /* wwFront:start */
        this.$store = store;
        /* wwFront:end */

        //Init services
        this.wwLog.init();

 
        wwLib.logStore.verbose('Starting the application...');
        await this.wwWebsiteData.init();
        this.wwLang.init(router);

        /* wwFront:start */
        // eslint-disable-next-line no-undef
        wwLib.wwPluginHelper.registerPlugin('plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186', plugin_f9ef41c3_1c53_4857_855b_f2f6a40b7186);
wwLib.wwPluginHelper.registerPlugin('plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa', plugin_1fa0dd68_5069_436c_9a7d_3b54c340f1fa);
wwLib.wwPluginHelper.registerPlugin('plugin-00d22f72-1a03-44f8-ad68-c593dc80b543', plugin_00d22f72_1a03_44f8_ad68_c593dc80b543);
wwLib.wwPluginHelper.registerPlugin('plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb', plugin_2bd1c688_31c5_443e_ae25_59aa5b6431fb);
wwLib.wwPluginHelper.registerPlugin('plugin-6a64802c-52f8-4637-9932-580bf178aaa7', plugin_6a64802c_52f8_4637_9932_580bf178aaa7);
wwLib.wwPluginHelper.registerPlugin('plugin-fbf0feec-356b-461b-8738-3b1f44edaf02', plugin_fbf0feec_356b_461b_8738_3b1f44edaf02);
wwLib.wwPluginHelper.registerPlugin('plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f', plugin_9c40819b_4a8f_468f_9ba5_4b9699f3361f);
        /* wwFront:end */

 
        services.scrollStore.start();
        services.keyboardEventStore.start();
    },
     // TODO: Verify with Alexis, still uses wwImageMultiLang
    getResponsiveStyleProp({ store, style, uid, states = [], prop }) {
        store = store || wwLib.getFrontWindow().wwLib.$store;
        if (!style && uid) {
            const wwObject = this.$store.getters['websiteData/getWwObjects'][uid];
            if (!wwObject) return '';
            style = (wwObject._state || {}).style || {};
        }

        const screenSizes = store.getters['front/getScreenSizes'];
        const screenSize = store.getters['front/getScreenSize'];

        let value = '';

        for (const media in screenSizes) {
            if (style[media] && typeof style[media][prop] !== 'undefined') {
                value = style[media][prop];
            }
            if (media === screenSize) {
                break;
            }
        }
        for (const state of states) {
            for (const media in screenSizes) {
                if (style[`${state}_${media}`] && style[`${state}_${media}`][prop]) {
                    value = style[`${state}_${media}`][prop];
                }
                if (media === screenSize) {
                    break;
                }
            }
        }

        return value;
    },
    globalContext: reactive({
        page: computed(() => {
            const page = wwLib.$store.getters['websiteData/getPage'];
            if (!page) return {};
            else if (!page.cmsDataSetPath) return { ...pageSanitizer(page) };
            return { ...pageSanitizer(page), data: wwLib.$store.getters['data/getPageCollectionData'] };
        }),
        pageParameters: computed(() => {
            const pageParameters = Object.values(wwLib.$store.getters['data/getPageParameterVariables']);
            const pageParametersValueMap = {};
            for (const pageParameter of pageParameters) pageParametersValueMap[pageParameter.id] = pageParameter.value;
            return pageParametersValueMap;
        }),
        pages: computed(() => {
            const pages = wwLib.$store.getters['websiteData/getPages'];
            const pagesValueMap = {};
            for (const page of pages) pagesValueMap[page.id] = pageSanitizer(page);
            return pagesValueMap;
        }),
        colors: computed(() => {
            const theme = wwLib.$store.getters['front/getTheme'];
             /* wwFront:start */
            // eslint-disable-next-line no-unreachable, no-undef
            return theme === 'dark' ? {"961c4f81-f913-4714-bf05-7c376c6c3f3f":"#E6F7FF","0204fd6e-2b6b-48ac-ae76-d068628e095b":"#BAE7FF","c37abad0-fc5a-4e32-88ea-8cbabe3a4535":"#91D5FF","c7ff15c1-191f-4953-a5c4-b029e8220ab8":"#69C0FF","efd46a02-6650-46ca-99e0-abceaaccab94":"#40A9FF","7067f018-a258-4a3d-a4b9-23b0f03a7b3e":"#1890FF","233d6413-7607-4f42-a8d2-d020742a6ebd":"#096DD9","2f606dad-f051-49d4-9b9e-7c0988f66187":"#0050B3","7116df2d-f904-45b8-a2e3-0fd5c630716d":"#003A8C","31ce4beb-f6f8-4e02-bdc3-22863b5eb7c9":"#002766","c4c33236-be00-4d2a-97d5-300a3d1b42ad":"#FF4D4F","a06db3f2-b0aa-4652-8bcf-0229638aabcb":"#FAAD14","0f73cc42-8a3d-4855-beac-f75b052ac128":"#52C41A","5f617188-eec6-4df4-97e9-02f62ff01f22":"#000000D9","4a09641a-2dd5-4e4f-ad2b-8c72475f7610":"#FFFFFF","16673554-2287-4a5c-b43f-adf1aebbc956":"#FAFAFA","dfa28a39-4ba5-49d6-ba88-2c377aab2727":"#F5F5F5","91b7a8e9-00e6-4665-8344-1cf806ca0cc3":"#F0F0F0","11800f84-c5bf-4ae7-8859-ea4bdf10a01e":"#D9D9D9","4607db0c-bdc4-4593-a4a7-c0d1a8cfa2cd":"#BFBFBF","6e696e1d-7458-467d-8f45-500b262323d8":"#8C8C8C","c0a08c07-88f2-4372-b405-b2502e30d7d2":"#595959","eebd0413-7c78-4281-9567-5fd8705d2eb0":"#434343","8b46d792-ecdd-4db2-91ad-dd0cb2976111":"#262626","cbad2025-903a-40d6-97ce-903507d2da9c":"#1F1F1F","a6a50a41-9a5f-47e3-a2c2-b9069b361f69":"#141414","9d8baf69-c42e-457b-8575-e7104aada495":"#000000","73d6975c-cd9e-4541-a624-c59759421e0b":"#FF7875","792460f1-ae01-4161-8ef8-4521ce5a961c":"#00000040","60650018-f023-4cee-8772-2990dba5d7de":"#00000073","0542759b-ae5b-4c3c-94cc-e9271828f1ba":"#0000000F","d8cee5da-3206-4ec5-a07c-ef34625ee89f":"#000000D9","bcbf013d-c9ff-4d7b-9296-f0c36047e464":"#00000040","29327006-c444-479c-b418-19255cf996c5":"#FFFFFF","60e0503d-d64b-4300-ba50-c34363d9ff51":"#FF85C0","5a57d08e-f1bd-4708-a101-318416e60f2a":"#FF4D4F","19b7e6eb-52c5-4e49-b602-31c68f5cbc6e":"#FADB14","a6d1ac61-8f0b-4410-acf7-ad87a79d66ca":"#FA8C16","2d0a7110-4652-406d-b127-643604ee1f8e":"#13C2C2","c141c458-642b-4a2f-8f0e-4b3bd77b759c":"#52C41A","2d8b852c-26a8-40fd-bc1d-e872f2658ce1":"#1890FF","0a8db2bb-891f-4517-b85a-e39770e45ce5":"#722ED1","2bbb7f38-e41e-460b-8613-ef874d61024a":"#2F54EB","7cecd5dc-6dd1-42b2-83fa-12cf8ca87613":"#EB2F96","42de2d6b-db73-4839-9af8-a5eca4bb39d2":"#FA541C","41334fed-619c-4819-9408-8ef421614e57":"#FAAD14","ddf9858c-a190-4f6d-a43a-ebb01fcd7ad9":"#51D895","d5c2730d-4b09-4afa-8ccf-f30f4c158aeb":"#FFD8BF","2c4aa1f1-761c-4474-8e0f-b126b2d6603a":"#161c24","552f9069-7ffc-4955-b743-52d5ff4d0405":"#212b36","365d50c8-3fcc-4420-82e4-cfde95d87e2e":"#2A4D98","d38fcb40-bdd6-4816-b18b-5ec2311be6ec":"#94A2AE80","8ba0ec95-b34c-4f9a-a323-b81c9a3534ee":"#E4ECF3","2e16e79c-a328-4ee7-bac5-f35fc8b9a764":"#212B36","e704eb12-4d91-409d-86e9-46b556183e18":"#000000","92ccfb89-62e7-44e8-8447-e51e1a580c95":"#DFF3F9","cf2ad073-5c83-48cd-a420-2f830b7bc357":"#F3F6F8","2744da3d-3bf9-4f7b-8c0f-9967e979908f":"#F7F7F8","6efd18f8-a733-4255-a582-5e11aa75add3":"#FFE5DF","394135b7-f6f0-48dd-a58b-138b990a71bc":"#f2f5f7","192c2344-6d11-44f4-911a-d50ffa550e7e":"#484747","41095baa-2c0a-477e-a7ba-80b3ce34f241":"#5E5A5A","b3e9fe26-fed4-44f2-bfef-b46415ff044e":"#D5E4F1"} : {"961c4f81-f913-4714-bf05-7c376c6c3f3f":"#E6F7FF","0204fd6e-2b6b-48ac-ae76-d068628e095b":"#BAE7FF","c37abad0-fc5a-4e32-88ea-8cbabe3a4535":"#91D5FF","c7ff15c1-191f-4953-a5c4-b029e8220ab8":"#69C0FF","efd46a02-6650-46ca-99e0-abceaaccab94":"#40A9FF","7067f018-a258-4a3d-a4b9-23b0f03a7b3e":"#1890FF","233d6413-7607-4f42-a8d2-d020742a6ebd":"#096DD9","2f606dad-f051-49d4-9b9e-7c0988f66187":"#0050B3","7116df2d-f904-45b8-a2e3-0fd5c630716d":"#003A8C","31ce4beb-f6f8-4e02-bdc3-22863b5eb7c9":"#002766","c4c33236-be00-4d2a-97d5-300a3d1b42ad":"#FF4D4F","a06db3f2-b0aa-4652-8bcf-0229638aabcb":"#FAAD14","0f73cc42-8a3d-4855-beac-f75b052ac128":"#52C41A","5f617188-eec6-4df4-97e9-02f62ff01f22":"#000000D9","4a09641a-2dd5-4e4f-ad2b-8c72475f7610":"#FFFFFF","16673554-2287-4a5c-b43f-adf1aebbc956":"#FAFAFA","dfa28a39-4ba5-49d6-ba88-2c377aab2727":"#F5F5F5","91b7a8e9-00e6-4665-8344-1cf806ca0cc3":"#F0F0F0","11800f84-c5bf-4ae7-8859-ea4bdf10a01e":"#D9D9D9","4607db0c-bdc4-4593-a4a7-c0d1a8cfa2cd":"#BFBFBF","6e696e1d-7458-467d-8f45-500b262323d8":"#8C8C8C","c0a08c07-88f2-4372-b405-b2502e30d7d2":"#595959","eebd0413-7c78-4281-9567-5fd8705d2eb0":"#434343","8b46d792-ecdd-4db2-91ad-dd0cb2976111":"#262626","cbad2025-903a-40d6-97ce-903507d2da9c":"#1F1F1F","a6a50a41-9a5f-47e3-a2c2-b9069b361f69":"#141414","9d8baf69-c42e-457b-8575-e7104aada495":"#000000","73d6975c-cd9e-4541-a624-c59759421e0b":"#FF7875","792460f1-ae01-4161-8ef8-4521ce5a961c":"#00000040","60650018-f023-4cee-8772-2990dba5d7de":"#00000073","0542759b-ae5b-4c3c-94cc-e9271828f1ba":"#0000000F","d8cee5da-3206-4ec5-a07c-ef34625ee89f":"#000000D9","bcbf013d-c9ff-4d7b-9296-f0c36047e464":"#00000040","29327006-c444-479c-b418-19255cf996c5":"#161c24","60e0503d-d64b-4300-ba50-c34363d9ff51":"#FF85C0","5a57d08e-f1bd-4708-a101-318416e60f2a":"#FF4D4F","19b7e6eb-52c5-4e49-b602-31c68f5cbc6e":"#FADB14","a6d1ac61-8f0b-4410-acf7-ad87a79d66ca":"#FA8C16","2d0a7110-4652-406d-b127-643604ee1f8e":"#13C2C2","c141c458-642b-4a2f-8f0e-4b3bd77b759c":"#52C41A","2d8b852c-26a8-40fd-bc1d-e872f2658ce1":"#1890FF","0a8db2bb-891f-4517-b85a-e39770e45ce5":"#722ED1","2bbb7f38-e41e-460b-8613-ef874d61024a":"#2F54EB","7cecd5dc-6dd1-42b2-83fa-12cf8ca87613":"#EB2F96","42de2d6b-db73-4839-9af8-a5eca4bb39d2":"#FA541C","41334fed-619c-4819-9408-8ef421614e57":"#FAAD14","ddf9858c-a190-4f6d-a43a-ebb01fcd7ad9":"#51D895","d5c2730d-4b09-4afa-8ccf-f30f4c158aeb":"#FFD8BF","2c4aa1f1-761c-4474-8e0f-b126b2d6603a":"#FFFFFF","552f9069-7ffc-4955-b743-52d5ff4d0405":"#FFFFFF","365d50c8-3fcc-4420-82e4-cfde95d87e2e":"#D6D6D7","d38fcb40-bdd6-4816-b18b-5ec2311be6ec":"#94A2AE","8ba0ec95-b34c-4f9a-a323-b81c9a3534ee":"#E4ECF3","2e16e79c-a328-4ee7-bac5-f35fc8b9a764":"#F5F5F5","e704eb12-4d91-409d-86e9-46b556183e18":"#000000","92ccfb89-62e7-44e8-8447-e51e1a580c95":"#DFF3F9","cf2ad073-5c83-48cd-a420-2f830b7bc357":"#F3F6F8","2744da3d-3bf9-4f7b-8c0f-9967e979908f":"#F7F7F8","6efd18f8-a733-4255-a582-5e11aa75add3":"#FFE5DF","394135b7-f6f0-48dd-a58b-138b990a71bc":"#f2f5f7","192c2344-6d11-44f4-911a-d50ffa550e7e":"#181616","41095baa-2c0a-477e-a7ba-80b3ce34f241":"#E3DEDE","b3e9fe26-fed4-44f2-bfef-b46415ff044e":"#D3F3F8"};
            /* wwFront:end */
        }),
        spacings:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"fb8260e8-36b3-482f-b6ad-ff430825fe1e":"48px","4623ec74-87a1-4e26-a51f-c7981ecbb1b8":"64px","9ce2fb65-c7a1-42ac-982e-b228bc814fa1":"2px","a228c6c0-00d5-436f-867a-fa1706a8827e":"4px","00b5a0d2-0597-4486-874e-7cc05cc0c21b":"8px","a4443c66-3f89-40ed-ae51-d1ba5b24fc3a":"12px","5b48757e-472c-42c3-8701-6d998bd10e53":"16px","ca6b3c6b-d358-4585-9dae-c8af5d59ffd7":"24px","a1c5b70c-97ee-4487-b777-cb4bd84aecee":"32px","6eb25880-329b-4bbc-b640-a91f25f3b2d8":"40px","869901c0-0f76-44d9-9d51-fb36c89e47fe":"8px","ad2e0d72-75dd-4d65-8312-4be102f16d3c":"16px","447f3199-9a4f-47ca-929e-aa45755e9830":"22px"},
        /* wwFront:end */
        typographies:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"b7ac6ea2-70f3-498c-95e6-7dbe6790e707":"400 14px/22px var(--ww-default-font-family, sans-serif)","55192c75-169a-48b8-9908-80cb961c80d1":"500 38px/46px var(--ww-default-font-family, sans-serif)","dd889592-7e77-4e8a-b10a-d46f78a22d66":"500 30px/40px var(--ww-default-font-family, sans-serif)","93f7dbc5-b4e2-45f3-9792-d89844aa3e73":"500 20px/28px var(--ww-default-font-family, sans-serif)","90d61302-1401-4241-aa74-526db31983e9":"500 16px/24px var(--ww-default-font-family, sans-serif)","42f30b37-4b3b-4aea-82e9-d96cde6a267e":"600 14px/22px var(--ww-default-font-family, sans-serif)","61f3b79e-6170-42a3-a572-6ee79375ff30":"400 12px/20px var(--ww-default-font-family, sans-serif)","838f4b54-056b-42ec-b0cd-b35acff059aa":"600 16px/24px var(--ww-default-font-family, sans-serif)","dede8a5c-2f0a-4231-a426-7bcf85013c72":"600 12px/18px var(--ww-default-font-family, sans-serif)","dc37cc14-492e-47c9-a35a-53067c6ca277":"400 12px/18px var(--ww-default-font-family, sans-serif)","7f797de0-c719-4921-b759-e46fdc1dc253":"400 16px/22px var(--ww-default-font-family, sans-serif)","4d9eb25f-dc35-44fa-8b64-f3459bbff3fe":"400 12px/20px var(--ww-default-font-family, sans-serif)","c2f56ea5-8e4c-4cbb-aaa8-ddd41c395269":"700 24px/32px var(--ww-default-font-family, sans-serif)","17a6d11f-e214-4dff-927f-ad7cbc53634d":"700 30px/20px 'Public Sans', sans-serif","2d095fd3-71c3-404a-9efb-b2945fe5a571":"500 16px/20px var(--ww-default-font-family, sans-serif)","1712ff62-3b1b-4d4f-b218-6fe79cb18f75":"600 20px/20px var(--ww-default-font-family, sans-serif)","c4385271-8c88-4ed4-953d-0aec3ddcb062":"700 25px/20px 'Public Sans', sans-serif","dc3e4692-1763-4d88-94f6-a9080c3c61aa":"400 16px/24px 'Public Sans', sans-serif","e8df7f8a-db4f-4158-ba5f-ed0c97a40293":"400 14px/21px 'Public Sans', sans-serif","f3217896-5688-416a-b6d2-5debf7a56f8b":"400 18px/28px 'Public Sans', sans-serif","9a3eba16-d1a3-4c89-8645-9717c8211a40":"500 26px/26px var(--ww-default-font-family, sans-serif)","2a6ace1a-9d57-40fc-a97a-cb84ffb119de":"400 13px/normal 'Public Sans', sans-serif"},
        /* wwFront:end */
        browser: computed(() => {
            const router = wwLib.manager ? wwLib.getEditorRouter() : wwLib.getFrontRouter();
            const currentRoute = router.currentRoute.value;
            let currentQueries = currentRoute.query;
             return {
                url: window.location.origin + currentRoute.fullPath,
                path: currentRoute.path,
                // verify if auth plugin
                 /* wwFront:start */
                // eslint-disable-next-line no-dupe-keys
                source: currentQueries._source,
                /* wwFront:end */
                query: currentQueries,
                domain: window.location.hostname,
                baseUrl: window.location.origin,
                breakpoint: wwLib.$store.getters['front/getScreenSize'],
                environment: wwLib.getEnvironment(),
                theme: wwLib.$store.getters['front/getTheme'],
            };
        }),
        screen: services.scrollStore.screen,
        componentPositionInfo: services.scrollStore.componentPositionInfo,
    }),

    pageData: computed(() => {
        const lang = wwLib.$store.getters['front/getLang'];
        const cmsDataSetPath = wwLib.$store.getters['websiteData/getPage'].cmsDataSetPath;
        if (!cmsDataSetPath) {
            return { lang };
        }

        return { lang, data: wwLib.$store.getters['data/getPageCollectionData'] };
    }),

    getEnvironment() {
        return wwLib.manager
            ? 'editor'
            : window.location.host.includes(
                  '-staging.' + (process.env.WW_ENV === 'staging' ? process.env.VUE_APP_PREVIEW_URL : '')
              )
            ? 'staging'
            : window.location.host.includes(process.env.VUE_APP_PREVIEW_URL)
            ? 'preview'
            : 'production';
    },

    useBaseTag() {
        return (
            wwLib.getEnvironment() === 'production' &&
            window.wwg_designInfo.baseTag &&
            window.wwg_designInfo.baseTag.href
        );
    },

    getBaseTag() {
        let baseTag = window.wwg_designInfo.baseTag?.href || '';
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return baseTag;
    },

    /**
     * @PUBLIC_API
     */
    getFrontWindow() {
        if (document.querySelector('.ww-manager-iframe')) {
            return document.querySelector('.ww-manager-iframe').contentWindow;
        }
        return window;
    },

    /**
     * @PUBLIC_API
     */
    getFrontDocument() {
        return this.getFrontWindow().document;
    },

    /**
     * @PUBLIC_API
     */
    getFrontRouter() {
        return this.front.router;
    },

    /**
     * @PUBLIC_API
     */
    getEditorWindow() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorDocument() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorRouter() {
        return this.editor.router;
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwApp.goTo
     */
    goTo(...args) {
        wwLib.wwLog.warn('wwLib.goTo is DEPRECATED, use wwLib.wwApp.goTo instead');
        wwLib.wwApp.goTo(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getStyleFromToken
     */
    getStyleFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getStyleFromToken is DEPRECATED, use wwLib.wwUtils.getStyleFromToken instead');
        return wwLib.wwUtils.getStyleFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getTypoFromToken
     */
    getTypoFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getTypoFromToken is DEPRECATED, use wwLib.wwUtils.getTypoFromToken instead');
        return wwLib.wwUtils.getTypoFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED
     */
    element(value) {
        wwLib.wwLog.warn('wwLib.element is DEPRECATED');
        if (typeof value === 'object') {
            return { isWwObject: true, ...value };
        } else {
            return { isWwObject: true, type: value };
        }
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.resolveObjectPropertyPath
     */
    resolveObjectPropertyPath(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.resolveObjectPropertyPath is DEPRECATED, use wwLib.wwUtils.resolveObjectPropertyPath instead'
        // );
        return wwLib.wwUtils.resolveObjectPropertyPath(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwutils.getTextStyleFromContent
     */
    getTextStyleFromContent(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.getTextStyleFromContent is DEPRECATED, use wwLib.wwUtils.getTextStyleFromContent instead'
        // );
        return wwLib.wwUtils.getTextStyleFromContent(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwWorkflow.executeGlobal
     */
    async executeWorkflow(...args) {
        wwLib.wwLog.warn('wwLib.executeWorkflow is DEPRECATED, use wwLib.wwWorkflow.executeGlobal instead');
        return wwLib.wwWorkflow.executeGlobal(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.findParentUidByFlag
     */
    findParentUidByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.findParentUidByFlag is DEPRECATED, use wwLib.findParentUidByFlag instead');
        return wwLib.wwEditor.findParentUidByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.selectParentByFlag
     */
    selectParentByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.selectParentByFlag is DEPRECATED, use wwLib.selectParentByFlag instead');
        return wwLib.wwEditor.selectParentByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useCreate
     */
    useCreateElement() {
        wwLib.wwLog.warn('wwLib.useCreateElement is DEPRECATED, use wwLib.wwElement.useCreate instead');
        return this.wwElement.useCreate();
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useLayoutStyle
     */
    useLayoutStyle() {
        wwLib.wwLog.warn('wwLib.useLayoutStyle is DEPRECATED, use wwLib.wwElement.useLayoutStyle instead');
        return wwLib.wwElement.useLayoutStyle();
    },

    /**
     * @PUBLIC_API
     */
    useIcons() {
        const store = useIconsStore();
        return {
            getIcon: store.getIcon,
        };
    },
};

function pageSanitizer(page) {
    const keysToInclude = [
        'id',
        'name',
        'folder',
        'metaImage',
        'pageLoaded',
        'paths',
        'langs',
        'meta',
        'title',
        'sections',
        'pageUserGroups',
    ];

    const _page = {};
    keysToInclude.forEach(key => {
        _page[key] = page[key];
    });

    _page.meta && delete _page.meta.__typename;
    for (const section of _page.sections || []) {
        delete section.__typename;
    }

    const lang = wwLib.$store.getters['front/getLang'];
    if (_page.paths) _page.path = _page.paths[lang] || _page.paths.default;
    else _page.path = null;

    _page.lang = lang;

    return _page;
}
