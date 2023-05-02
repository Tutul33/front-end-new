import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { SearchModel } from "src/app/models/commonModels/search.model";
import { Menu, MenuPermission } from "src/app/models/menuModels/menu.model";
import { MenuModels, MenuPermissionModels } from "src/app/models/menuModels/menuSearch.model";
import { ModulesModels } from "src/app/models/moudleNodels/moduleSearch.model";
import { Modules } from "src/app/models/moudleNodels/modules.model";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn:'root'
})
export class moduleService{
    constructor(private http:HttpClient){

    }
    //Modules
    getModules(search:SearchModel): Observable<ModulesModels> {
        let filter='';
        let url=`${environment.API_URL}/api/module/GetModuleList`;
        if(search.pageNumber!=undefined || search.pageNumber!=null){
            filter+='PageNumber='+search.pageNumber;
        }
        if(search.pageSize){
            filter+='&PageSize='+search.pageSize;
        }
        if (search.searching) {
            filter+='&search='+search.searching;
        }
        if (filter!='') {
            url=url+'?'+filter;
        }
        return this.http
            .get(url)
            .pipe(
                map((data: any) => {
                    const modules: Modules[] = [];
                    for (let key in data.list) {
                        modules.push({ ...data.list[key], id: key });
                    }
                    const moduleList=modules.sort().reverse();
                    const moduleModel:ModulesModels={
                        moduleList: moduleList,
                        total: data.total
                    }
                    return moduleModel;
                }
                )
            );
    }
    addModule(user: Modules): Observable<Modules> {
        let url=`${environment.API_URL}/api/module/CreateModule`;
        return this.http.post<Modules>(url, user);
    }
    updateModule(user: Modules) {
        let url=`${environment.API_URL}/api/module/UpdateModule`;
        return this.http
            .put<Modules>(url, user);
    }
    deleteModule(id: number):Observable<Modules> {
        let url=`${environment.API_URL}/api/module/DeleteModule/${id}`;      
        return this.http.delete<Modules>(url);
    }
    getModuleById(id: number):Observable<Modules> {
        let url=`${environment.API_URL}/api/module/GetModuleByModuleId/${id}`;      
        return this.http.get<Modules>(url);
    }
    //Menus
    getMenus(search:SearchModel): Observable<MenuModels> {
        let filter='';
        let url=`${environment.API_URL}/api/module/GetMenuList`;
        if(search.pageNumber!=undefined || search.pageNumber!=null){
            filter+='PageNumber='+search.pageNumber;
        }
        if(search.pageSize){
            filter+='&PageSize='+search.pageSize;
        }
        if (search.searching) {
            filter+='&search='+search.searching;
        }
        if (filter!='') {
            url=url+'?'+filter;
        }
        return this.http
            .get(url)
            .pipe(
                map((data: any) => {
                    const menus: Menu[] = [];
                    for (let key in data.list) {
                        menus.push({ ...data.list[key], id: key });
                    }
                    const menuList=menus.sort().reverse();
                    const menuModel:MenuModels={
                        menuList: menuList,
                        total: data.total
                    }
                    return menuModel;
                }
                )
            );
    }
    addMenu(user: Menu): Observable<Menu> {
        let url=`${environment.API_URL}/api/module/CreateMenu`;
        return this.http.post<Menu>(url, user);
    }
    updateMenu(user: Menu) {
        let url=`${environment.API_URL}/api/module/UpdateMenu`;
        return this.http
            .put<Menu>(url, user);
    }
    deleteMenu(id: number) {
        let url=`${environment.API_URL}/api/module/DeleteMenu/${id}`;      
        return this.http.delete<Menu>(url);
    }
    getMenuById(id: number):Observable<Menu> {
        let url=`${environment.API_URL}/api/module/GetMenuByCMenuID/${id}`;      
        return this.http.get<Menu>(url);
    }
    //
    getMenuPermissions(search:SearchModel): Observable<MenuPermissionModels> {
        let filter='';
        let url=`${environment.API_URL}/api/module/GetMenuPermissionList`;
        if(search.pageNumber!=undefined || search.pageNumber!=null){
            filter+='PageNumber='+search.pageNumber;
        }
        if(search.pageSize){
            filter+='&PageSize='+search.pageSize;
        }
        if (search.searching) {
            filter+='&search='+search.searching;
        }
        if (filter!='') {
            url=url+'?'+filter;
        }
        return this.http
            .get(url)
            .pipe(
                map((data: any) => {
                    const menus: MenuPermission[] = [];
                    for (let key in data.list) {
                        menus.push({ ...data.list[key], id: key });
                    }
                    const menuList=menus.sort().reverse();
                    const menuModel:MenuPermissionModels={
                        menuPermissionList: menuList,
                        total: data.total
                    }
                    return menuModel;
                }
                )
            );
    }
}