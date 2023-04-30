import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SearchModel } from 'src/app/models/commonModels/search.model';
import { Menu, MenuPermission } from 'src/app/models/menuModels/menu.model';
import { Modules } from 'src/app/models/moudleNodels/modules.model';
import { PagerService } from 'src/app/services/commonServices/paginator.service';
import { AppState } from 'src/app/store/app.state';
import { loadMenu, loadMenuPermission } from '../state/module.actions';
import { getMenuPermissionsAll, getMenusAll } from '../state/module.selector';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-menu-permission',
  templateUrl: './menu-permission.component.html',
  styleUrls: ['./menu-permission.component.css'],
  providers:[PagerService]
})
export class MenuPermissionComponent implements OnInit,OnDestroy{
  displayedColumns: string[] = ['menuName', 'moduleName', 'canCreate', 'canDelete','canView','canEdit','roleName','actions'];
  dataSource: any = [];
  modulesSubscription?:Subscription;
  moduleList: MenuPermission[]=[];
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
  searchStr:string='';
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    if (filterValue!='') {
      this.searchStr=filterValue.trim().toLowerCase();
      this.isPaging=true;
      this.loadMenus(0);
    }else{
      this.searchStr='';
      this.isPaging=true;
      this.loadMenus(0);
    }
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.loadMenus(0);
  }
  clearAll(){
    this.searchStr='';
  }
  addNewModule(){

  }
  EditModule(event:Event,module:Modules){

  }
  DeleteModule(event:Event,module:Modules){
    
  }
  loadMenus(pageIndex: number) {
    this.pageNumber=pageIndex;
    const searchModel: SearchModel = {
      searching: this.searchStr,
      pageNumber: pageIndex,
      pageSize: this.pageSize
    }
    this.store.dispatch(loadMenuPermission({search:searchModel}));
    this.modulesSubscription = this.store.select(getMenuPermissionsAll).subscribe((data) => {
      if (data) {
        this.moduleList = data.menuPermissions;
        this.dataSource = new MatTableDataSource<MenuPermission>(this.moduleList);
        this.totalRows = data.total;
        //paging info start   
        this.totalRowsInList = this.moduleList.length;
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
          this.pagedItems = this.moduleList;
      }
    });
  }
  //Set Page
  setPaging(page: number, isPaging: boolean) {
    this.pager = this.pageService.getPager(this.totalRows, page, this.pageSize);
    if (isPaging) {
      this.loadMenus(page);
    }
    else {
      this.pagedItems = this.moduleList;
    }
  }
}