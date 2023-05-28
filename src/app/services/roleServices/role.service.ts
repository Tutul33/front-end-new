import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { Role, RoleModels } from "src/app/models/rolesModel/role.model";
import { UserModels } from "src/app/models/userModels/user.model";
import { AppState } from "src/app/store/app.state";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class RoleService{
 constructor(private store:Store<AppState>,private http:HttpClient){
 }   
 getRoles(search:RoleModels): Observable<RoleModels> {
    let filter='';
    debugger
    let url=`${environment.API_URL}/api/role/GetRoleList`;
    if(search.pageNumber!=undefined || search.pageNumber!=null){
        filter+='PageNumber='+search.pageNumber;
    }
    if(search.pageSize){
        filter+='&PageSize='+search.pageSize;
    }
    if (search.searching) {
        filter+='&search='+search.searching;
    }
    // if (search.roleId>0) {
    //     filter+='&roleId='+search.roleId;
    // }
    if (filter!='') {
        url=url+'?'+filter;
    }
    return this.http
        .get(url)
        .pipe(
            map((data: any) => {
                const roles: Role[] = [];
                for (let key in data.list) {
                    roles.push({ ...data.list[key], id: key });
                }
                const roleList=roles.sort().reverse();
                const rolesModel:RoleModels={
                    roles: roleList,
                    total: data.total
                }
                return rolesModel;
            }
            )
        );
}

addRole(postModel:any): Observable<Role> {
    
    let url=`${environment.API_URL}/api/role/CreateRole`;
    return this.http.post<Role>(url, postModel);
}
updateRole(postModel:any) {
    let url=`${environment.API_URL}/api/role/UpdateRole`;
    return this.http
        .put<Role>(url, postModel);
}
deleteRole(id: number) {
    let url=`${environment.API_URL}/api/role/DeleteRole/${id}`;      
    return this.http.delete<Role>(url);
}
getRoleById(id: number):Observable<Role> {
    let url=`${environment.API_URL}/api/customer/GetRoleByRoleId/${id}`;      
    return this.http.get<Role>(url);
}
}