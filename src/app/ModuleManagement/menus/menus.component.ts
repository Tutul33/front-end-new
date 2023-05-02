import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SearchModel } from 'src/app/models/commonModels/search.model';
import { Menu } from 'src/app/models/menuModels/menu.model';
import { Modules } from 'src/app/models/moudleNodels/modules.model';
import { PagerService } from 'src/app/services/commonServices/paginator.service';
import { AppState } from 'src/app/store/app.state';
import { deleteMenu, loadMenu } from '../state/module.actions';
import { getMenusAll, getModulesAll } from '../state/module.selector';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditMenuComponent } from './add-edit-menu/add-edit-menu.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
  providers:[PagerService]
})
export class MenusComponent implements OnInit,OnDestroy{
  displayedColumns: string[] = ['menuName', 'moduleName', 'menuIcon', 'menuPath','menuSequence','actions'];
  dataSource: any = [];
  menuSubscription?:Subscription;
  menuList: Menu[]=[];
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
  SearchMenu(){

  }
  addNewMenu(){
   const menu:Menu={
     menuId: 0,
     menuName: '',
     moduleId: 0,
     menuColor: '',
     parentId: 0,
     isSubParent: false,
     subParentId: 0,
     menuIcon: '',
     menuPath: '',
     description: '',
     menuSequence: 0
   }
   this.openDialog(menu);
  }
  openDialog(menu:Menu): void {
    const dialogRef = this.dialog.open(AddEditMenuComponent, {
      width: '700px',
      data: menu,
      exitAnimationDuration:environment.exitAnimationDuration,
      enterAnimationDuration:environment.enterAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {      
      this.isPaging=true;
      if(menu.menuId as number>0){
        this.loadMenus(this.pageNumber);      
      }else{
        this.loadMenus(0);      
      }      
    });
  }
  EditMenu(event:Event,menu:Menu){
    this.openDialog(menu);
  }
  DeleteMenu(event:Event,module:Menu){
    if (confirm("Are you sure to delete this record?")) {
      this.store.dispatch(deleteMenu({id:module.moduleId as number}));
      this.isPaging=true;
      this.loadMenus(0);     
     }
  }
  loadMenus(pageIndex: number) {
    this.pageNumber=pageIndex;
    const searchModel: SearchModel = {
      searching: this.searchStr,
      pageNumber: pageIndex,
      pageSize: this.pageSize
    }
    this.store.dispatch(loadMenu({search:searchModel}));
    this.menuSubscription = this.store.select(getMenusAll).subscribe((data) => {
      if (data) {
        this.menuList = data.menus;
        //this.dataSource = new MatTableDataSource<Menu>(this.menuList);
        this.totalRows = data.total;
        //paging info start   
        this.totalRowsInList = this.menuList.length;
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
          this.pagedItems = this.menuList;
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
      this.pagedItems = this.menuList;
    }
  }
}
