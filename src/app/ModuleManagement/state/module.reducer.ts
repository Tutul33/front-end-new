import { createReducer, on } from "@ngrx/store"
import { initialState } from "./module.state";
import { addMenuSuccess, addModuleSuccess, deleteMenuSuccess, deleteModuleSuccess, loadMenuPermissionSuccess, loadMenuSuccess, loadModuleSuccess, updateMenuSuccess, updateModuleSuccess } from "./module.actions";

 export const _moduleReducer=createReducer(initialState,
   //Modules
   on(addModuleSuccess,(state,action)=>{
      let module = { ...action.module };
      return {
          ...state,
          modules: [...state.modules, module]
      }
  }),
  on(updateModuleSuccess, (state, action) => {  
      const updatedModules = state.modules.map((module) => {
          return action.module.moduleId === module.moduleId ? action.module : module;
      });
      return {
          ...state,
          modules: updatedModules
      }
  }),
  on(deleteModuleSuccess, (state, { id,total }) => {
      const updatedModules = state.modules.filter(module => {
          return module.moduleId != id;
      });
      return {
          ...state,
          modules: updatedModules,
          total:total
      }
  }),
  on(loadModuleSuccess, (state, action) => {        
      return {
          ...state,
          modules: action.module.moduleList,
          total:action.module.total
      }
  }),
  //Menu
  on(addMenuSuccess,(state,action)=>{
   let menu = { ...action.menu };
   return {
       ...state,
       menus: [...state.menus, menu]
   }
}),
on(updateMenuSuccess, (state, action) => {  
   const updatedMenus = state.menus.map((menu) => {
       return action.menu.menuId === menu.menuId ? action.menu : menu;
   });
   return {
       ...state,
       menus: updatedMenus
   }
}),
on(deleteMenuSuccess, (state, { id,total }) => {
   const updatedMenus = state.menus.filter(menu => {
       return menu.menuId != id;
   });
   return {
       ...state,
       menus: updatedMenus,
       total:total
   }
}),
on(loadMenuSuccess, (state, action) => {        
   return {
       ...state,
       menus: action.menu.menuList,
       total:action.menu.total
   }
}),
on(loadMenuPermissionSuccess, (state, action) => {        
   return {
       ...state,
       menuPermissions: action.menuPermission.menuPermissionList,
       total:action.menuPermission.total
   }
})
 );
 export function moduleReducer(state: any, action: any) {
   return _moduleReducer(state, action);
}