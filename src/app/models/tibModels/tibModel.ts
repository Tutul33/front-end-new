export interface TIB_MENU{
     title :string,
     shortName:string,
     fullName:string
}
export interface TibModels extends TIB_MENU{
    sesion:string,
    title :string,
    shortName:string,
    fullName:string
    menuList:TIB_MENU[]
}