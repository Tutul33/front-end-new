import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { deleteUser, loadUsers } from '../state/users.action';
import { IUserModel } from 'src/app/models/userModels/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './add-edit-user/userDialogComponent';
import { Subscription } from 'rxjs';
import { getUserAll} from '../state/users.selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchModel } from 'src/app/models/commonModels/search.model';
import { PagerService } from 'src/app/services/commonServices/paginator.service';
import { getAthourizedActions, getAthourizedModules } from 'src/app/auth/state/auth.selector';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [PagerService]
})
export class UserManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone','actions'];
  dataSource: any = [];
  userList?: IUserModel[];
  //@ViewChild(MatPaginator) paginator: MatPaginator | any;
  userSubscription: Subscription | any;
  moduleSubscription: Subscription|any;
  //Dialog
  exitAnimationDuration: string="500ms"; 
  enterAnimationDuration: string="500ms";
  //Search
  searchStr:string='';
  //Pagination
  public pageNumber: number = 0;
  public pageSize: number = 5;
  public totalRows: number = 0;
  public pager: any = {};
  public pagedItems: any = [];
  public pageStart: number = 0;
  public pageEnd: number = 0;
  public totalRowsInList: number = 0;
  public isPaging: boolean = true;
  public pageSizeList: any = [];

  constructor(private store: Store<AppState>, private dialog: MatDialog, private pageService: PagerService) {
    this.pageSizeList = pageService.pageSize();
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.moduleSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {   
    this.loadAuthourizedData();
    this.loadUser(0);    
  }
  authourizedData:any={moduleId:0,modulepath:'',menuId:0,menuPath:'',canCreate:false,canView:false,canDelete:false,canEdit:false};
  loadAuthourizedData(){
    this.moduleSubscription=this.store.select(getAthourizedActions).subscribe((data)=>{
      if(data){
        console.log(data);
        this.authourizedData.moduleId=data.moduleId;
        this.authourizedData.modulepath=data.modulepath;
        this.authourizedData.menuId=data.moduleId;
        this.authourizedData.menuPath=data.menuPath;
        this.authourizedData.canCreate=data.canCreate;
        this.authourizedData.canView=data.canView;
        this.authourizedData.canDelete=data.canDelete;
        this.authourizedData.canEdit=data.canEdit;
      }      
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    if (filterValue!='') {
      this.searchStr=filterValue.trim().toLowerCase();
      this.isPaging=true;
      this.loadUser(0);
    }else{
      this.searchStr='';
      this.isPaging=true;
      this.loadUser(0);
    }
  }
  clearAll(){
    this.searchStr='';
  }
  loadUser(pageIndex: number) {
    this.pageNumber=pageIndex;
    const searchModel: SearchModel = {
      searching: this.searchStr,
      pageNumber: pageIndex,
      pageSize: this.pageSize
    }
    this.store.dispatch(loadUsers({ search: searchModel }));
    this.userSubscription = this.store.select(getUserAll).subscribe((data) => {
      if (data) {
        this.userList = data.users;
        this.dataSource = new MatTableDataSource<IUserModel>(this.userList);
        this.totalRows = data.total;
        //paging info start   
        this.totalRowsInList = this.userList.length;
        if (this.pageNumber == 0 || this.pageNumber == 1) {
          this.pageStart = 1;
          if (this.totalRowsInList < this.pageSize) {
            this.pageEnd = this.totalRowsInList;
          } else {
            this.pageEnd = this.pageSize;
          }
        } else {
          this.pageStart = (this.pageNumber - 1) * this.pageSize + 1;
          this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
        }
        //paging info end
        if (this.isPaging)
          this.setPaging(pageIndex, !this.isPaging);
        else
          this.pagedItems = this.userList;
      }
    });
  }
  //Set Page
  setPaging(page: number, isPaging: boolean) {
    this.pager = this.pageService.getPager(this.totalRows, page, this.pageSize);
    if (isPaging) {
      this.loadUser(page);
    }
    else {
      this.pagedItems = this.userList;
    }
  }
  addNewUser(){
    const customer:IUserModel={
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      customerId:0
    }
    this.openDialog(customer);
  }
  openDialog(customer:IUserModel): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: customer,
      panelClass: 'user-dialog',
      exitAnimationDuration:this.exitAnimationDuration,
      enterAnimationDuration:this.enterAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {      
      this.isPaging=true;
      if(customer.customerId as number>0){
        this.loadUser(this.pageNumber);      
      }else{
        this.loadUser(0);      
      }      
    });
  }
  EditUser(event:Event,customer:IUserModel){
  this.openDialog(customer);
  }
  DeleteUser(event:Event,customer:IUserModel){
   if (confirm("Are you sure to delete this record?")) {
    this.store.dispatch(deleteUser({id:customer.customerId as number}));
    this.isPaging=true;
    this.loadUser(0);     
   }
  }
}

