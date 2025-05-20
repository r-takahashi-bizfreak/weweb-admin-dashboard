import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"8fd638f2-70c2-4bae-bc2b-74429b8bea97","homePageId":"ddb7afe8-6b8d-4559-9d3d-9e84ff20359e","authPluginId":"6a64802c-52f8-4637-9932-580bf178aaa7","baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[{"id":"dbb53cec-a2dd-46e9-bd5f-ae9db8093c99","actions":{},"trigger":"onload-app"}],"pages":[{"id":"2e7f38f0-102f-4ca9-846c-dcb8a4e1c205","linkId":"2e7f38f0-102f-4ca9-846c-dcb8a4e1c205","name":"Payment Page","folder":null,"paths":{"en":"payment-page","default":"payment-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"bc1831a0-3808-40dd-864b-1f68c7112697","sectionTitle":"Section","linkId":"78044e64-e99e-413e-a335-5ee1c5a6b141"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"413977bf-bca5-44bb-8562-efd1d5a405cf","linkId":"413977bf-bca5-44bb-8562-efd1d5a405cf","name":"Graphs Dummy","folder":null,"paths":{"en":"graphs-dummy","default":"graphs-dummy"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"a1a35456-e13f-487a-b08e-4295376ba1ad","sectionTitle":"Section","linkId":"3efa2e43-c1ca-4f05-9555-20bada11f66d"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"966f71c0-92e2-4a56-99d5-48d670e44f19","linkId":"966f71c0-92e2-4a56-99d5-48d670e44f19","name":"Product Page","folder":null,"paths":{"en":"product-page","default":"product-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"247743e4-d30b-4d0f-91fd-ab1334358bdc","sectionTitle":"Content","linkId":"11308e20-86e1-4a16-b8f7-82883f9264c8"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"0c26edea-1186-4e9c-8ac9-c340e6a77441","linkId":"0c26edea-1186-4e9c-8ac9-c340e6a77441","name":"Edit product","folder":null,"paths":{"en":"edit-product","default":"edit-product"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"0eb2d488-caee-43c6-a712-a5c73f81cb47","sectionTitle":"Content","linkId":"e6a210ea-05c7-4648-a32f-032634ddeef8"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"3fa606d2-457a-4030-8c8a-cd9a2589916c","linkId":"3fa606d2-457a-4030-8c8a-cd9a2589916c","name":"Author page","folder":null,"paths":{"en":"author-page","default":"author-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"aa5b9ed6-7608-4141-8742-e1cf8a966c77","sectionTitle":"Content","linkId":"d4a1d471-6eef-4987-a850-1e7bcbf1f701"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"42a98ca8-56f4-4d34-b12f-667ba0c43988","linkId":"42a98ca8-56f4-4d34-b12f-667ba0c43988","name":"Tour-List","folder":null,"paths":{"en":"tour-list","default":"tour-list"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"66982de1-cad9-4f49-a493-9c41bea2a0bc","sectionTitle":"Content","linkId":"28e31432-7793-4a53-a6e2-e9c2dc3b1cd9"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"b559e331-b051-480d-8126-105b4a881dab","linkId":"b559e331-b051-480d-8126-105b4a881dab","name":"Create Product","folder":null,"paths":{"en":"create-product","default":"create-product"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"3857985d-194c-4194-87f0-2a72c72e69b2","sectionTitle":"Content","linkId":"27242d8a-ea5f-4c1b-b6d5-adadc186ec07"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"24e0b2c1-f6d3-4f00-9f73-b9d344d034c4","linkId":"24e0b2c1-f6d3-4f00-9f73-b9d344d034c4","name":"Tour-Details","folder":null,"paths":{"en":"tour-details","default":"tour-details"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"6cddd77d-6d7e-451d-93cb-96bcb64ca32c","sectionTitle":"Content","linkId":"abf6be35-5ff2-41e9-bb94-966a5a899b53"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"634d981a-8dd1-464a-9760-e1caad0110e4","linkId":"634d981a-8dd1-464a-9760-e1caad0110e4","name":"Create User Page","folder":null,"paths":{"en":"create-user-page","default":"create-user-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"5bfaff99-cec7-418e-bec8-859b43a922f0","sectionTitle":"Content","linkId":"dadcb272-f650-49e4-87d3-e77fe61df74c"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"5ba43257-501b-44fb-bdb9-65bcf3ae7930","linkId":"5ba43257-501b-44fb-bdb9-65bcf3ae7930","name":"Edit user page","folder":null,"paths":{"en":"edit-user-page","default":"edit-user-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"bb585ec0-814a-43ca-9cf0-18572b7fff5b","sectionTitle":"Content","linkId":"a8eba248-9bf2-44c5-8eee-b8c5b7633ae6"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"6a1ac69f-fbec-48f7-8506-6d62e550a34a","linkId":"6a1ac69f-fbec-48f7-8506-6d62e550a34a","name":"Chat","folder":null,"paths":{"en":"chat","default":"chat"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"981c1257-e574-4492-ad76-cb01aaab8ef1","sectionTitle":"Mini Sidebar","linkId":"ae2fc6b5-c55f-4a9b-a90a-0174f127d940"},{"uid":"b6649473-e476-4e4c-b4fe-ea1d664f3193","sectionTitle":"Content","linkId":"99784354-8099-49fc-909a-4bfdb6d5d4c3"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"d96d495d-e6f1-45f2-b1af-720ede313ff0","linkId":"d96d495d-e6f1-45f2-b1af-720ede313ff0","name":"Account page","folder":null,"paths":{"en":"account-page","default":"account-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"918a5579-aa41-4885-94e7-64ceb9a2b745","sectionTitle":"Content","linkId":"4ad6e885-e40e-46a0-a2cf-dc455280b595"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"38863acf-bf6b-476a-a73f-65e385539aa2","linkId":"38863acf-bf6b-476a-a73f-65e385539aa2","name":"Email Page","folder":null,"paths":{"en":"email","default":"email"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"1efa2873-fe4f-4f98-a3c2-863a5cb68068","sectionTitle":"Sidemenu","linkId":"522bb2ee-6099-45dd-94cb-19382b551790"},{"uid":"da82083f-15f8-48db-963c-971439e0f152","sectionTitle":"Content","linkId":"8705fb33-263f-419e-92e3-14df0f9fde4e"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"42bff9ff-a830-49e0-8fdd-8d1db04ffdf6","linkId":"42bff9ff-a830-49e0-8fdd-8d1db04ffdf6","name":"Forgot Password","folder":null,"paths":{"en":"forgot-password","default":"forgot-password"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"031403d9-6a1f-479c-8f33-79fd485c5ded","sectionTitle":"Password reset section","linkId":"161e062a-d9d5-4fd6-9252-9a5985cbe822"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"2ce43aa7-7d0b-4f6f-a38d-1872cb09d26b","linkId":"2ce43aa7-7d0b-4f6f-a38d-1872cb09d26b","name":"Calendar","folder":null,"paths":{"en":"calendar","default":"calendar"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"20f2dfce-ad89-4ac8-931b-651de8fd97d3","sectionTitle":"Content","linkId":"9de995cb-b0db-436e-86d2-15e2443d3720"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"206bca40-e54d-461a-8e3e-7b17491ab15f","linkId":"206bca40-e54d-461a-8e3e-7b17491ab15f","name":"Cards","folder":null,"paths":{"en":"cards","default":"cards"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"c58e2642-aabb-41be-9607-972992e624a2","sectionTitle":"Content","linkId":"908b359b-65ae-43eb-95cd-ad5ebe147950"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"762c1c75-2ea5-450e-aa2b-899e6c05f7f2","linkId":"762c1c75-2ea5-450e-aa2b-899e6c05f7f2","name":"KanBan Board Page","folder":null,"paths":{"en":"kanban-board-page","default":"kanban-board-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"c8fa29bc-e61e-46b1-ac15-fbc4ba0c25e7","sectionTitle":"Content","linkId":"6520218a-45e8-4c3c-ac80-0ed8392d4f4e"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"87082257-c39e-4b0d-84de-268a8cba3a35","linkId":"87082257-c39e-4b0d-84de-268a8cba3a35","name":"Login","folder":null,"paths":{"en":"login","default":"login"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"1f72bdf2-d328-49ac-a1d3-1563096e08ad","sectionTitle":"Login section","linkId":"4a6e4b75-d70f-44b6-832d-2c4fe48e38bb"}],"pageUserGroups":[],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"1a454c1f-c53b-4be7-a1d5-b56f8cd77d61","linkId":"1a454c1f-c53b-4be7-a1d5-b56f8cd77d61","name":"Sign up","folder":null,"paths":{"en":"sign-up","default":"sign-up"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"a6d49b3b-99a5-4489-88de-28dbcce4c795","sectionTitle":"Signup section","linkId":"911c57ef-b256-4cd5-82b9-5d1b52ad7310"}],"pageUserGroups":[],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"ecbff067-c3ee-4de5-87cc-01b1025383ce","linkId":"ecbff067-c3ee-4de5-87cc-01b1025383ce","name":"Blog","folder":null,"paths":{"en":"blog","default":"blog"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"83b5ea7b-161f-48ec-8ca2-3b46d7794e0c","sectionTitle":"Content","linkId":"cd73aded-8918-49a4-a691-942c6271ae4c"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"ddb7afe8-6b8d-4559-9d3d-9e84ff20359e","linkId":"ddb7afe8-6b8d-4559-9d3d-9e84ff20359e","name":"Dashboard","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"9327559d-7c8f-476f-9d6a-495c4864a7ef","sectionTitle":"Content","linkId":"99d8f30b-98b4-4294-8eb4-4a8ba774b46d"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"101ebddd-98a4-4a5c-b153-4250d879c1b0","linkId":"101ebddd-98a4-4a5c-b153-4250d879c1b0","name":"Profile Page","folder":null,"paths":{"en":"profile-page","default":"profile-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"874c2a15-16a2-4aca-9d0b-d81545843616","sectionTitle":"Mini Sidebar","linkId":"c077362e-32d4-4994-bab6-9c825deb87a0"},{"uid":"bf83f690-8a05-47e0-874c-5fd23b5d826f","sectionTitle":"Content","linkId":"ddbd1191-9aed-4c0e-a081-79c6a58eed1c"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"4b1f6426-55cc-4895-a1e9-74539fa50a40","linkId":"4b1f6426-55cc-4895-a1e9-74539fa50a40","name":"Order Success Page","folder":null,"paths":{"en":"order-success-page","default":"order-success-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"af83c991-bb67-49ea-a651-3cf2127f8987","sectionTitle":"Section","linkId":"18e609d9-7bdb-43a8-8e8f-c182cc872fb7"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"47222750-de65-4e9b-9da3-8aa9f339f32a","linkId":"47222750-de65-4e9b-9da3-8aa9f339f32a","name":"Details Page","folder":null,"paths":{"en":"details-page","default":"details-page"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9953dfc3-e2ce-4143-a1d5-5bc746f48bb0","sectionTitle":"Sidemenu","linkId":"fcf8e07f-53f9-43f4-96c2-efab72adadd7"},{"uid":"49b8b3b0-3fb0-4a0d-bcaf-7e98b23d4700","sectionTitle":"Mini Sidebar","linkId":"4a92af7f-c6e1-4da1-babb-37af3d508530"},{"uid":"2a02d93c-5a81-40b5-9bbd-b29407ce3c51","sectionTitle":"Content","linkId":"26601c0a-488f-40e5-84c2-668eec2a5f3d"}],"pageUserGroups":[{}],"title":{"en":"Admin Dashboard"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"00d22f72-1a03-44f8-ad68-c593dc80b543","name":"Stripe","namespace":"stripe"},{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"fbf0feec-356b-461b-8738-3b1f44edaf02","name":"Google GTM","namespace":"gtm"},{"id":"9c40819b-4a8f-468f-9ba5-4b9699f3361f","name":"Charts","namespace":"chartjs"},{"id":"6a64802c-52f8-4637-9932-580bf178aaa7","name":"WeWeb Auth","namespace":"wewebAuth"},{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 1;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        '-staging.' + (process.env.WW_ENV === 'staging' ? process.env.VUE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(process.env.VUE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
