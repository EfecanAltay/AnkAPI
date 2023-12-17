import { MenuItemData } from '@/common/data/sidebar-menu/sidebar-item.data';
import mainMenuDataList from './datas/main-menu-data.json';
import contentMenuDataList from './datas/content-menu-data.json';

import UICreateAPIPage from '@/components/contents/create-api.page';
import { ContentMenuItem } from '@/common/data/content-menu/content-menu.data';

export class MockDataProvider{
    public static GetMainMenuData(){
        const resultList : MenuItemData[] = [];
        const list = mainMenuDataList as [];
        list.forEach((element,index) => {
            const e = (element as MenuItemData)
            if(index === 0){
                e.PageContent = <UICreateAPIPage />;
                e.ContentPageContainerInfo.ContentMenuList = MockDataProvider.GetContentMenuData();
            }
             
            resultList.push(e);
        });
        return resultList;
    }

    public static GetContentMenuData(){
        const resultList : ContentMenuItem[] = [];
        const list = contentMenuDataList as [];
        list.forEach((element,index) => {
            const e = (element as ContentMenuItem)
            resultList.push(e);
        });
        return resultList;
    }
}