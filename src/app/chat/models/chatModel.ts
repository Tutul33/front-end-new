export interface ChatModel{
    id:number;
    groupId:number;
    messages:string;
    mediaUrl:string;
    mediaExt:string;
    fromUserId?:number;
    fromUserNAme?:string;
    toUserId?:number;
    toUserNAme?:string;
    createDate:Date;
    updateDate:Date;
    isActive:boolean;
    isSuccess:boolean;
    total:number;
}
export interface ChatModels{
    chatList:ChatModel[];
    total:number;
}