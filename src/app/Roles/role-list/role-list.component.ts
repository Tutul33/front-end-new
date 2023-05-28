import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PagerService } from 'src/app/services/commonServices/paginator.service';
import { AppState } from 'src/app/store/app.state';
import { loadRole } from '../state/roles.actions';
import { Role, RoleModels } from 'src/app/models/rolesModel/role.model';
import { Subscription } from 'rxjs';
import { getRoles } from '../state/roles.selector';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
  providers:[PagerService]
})
export class RoleListComponent implements OnInit {
  roleList: Role[]=[];
  roleSubscription?:Subscription;
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
  ngOnInit(): void {
    this.LoadRoles(1);
  }
  searchStr:string='';
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue!='') {
      this.searchStr=filterValue.trim().toLowerCase();
      this.isPaging=true;
      this.LoadRoles(0);
    }else{
      this.searchStr='';
      this.isPaging=true;
      this.LoadRoles(0);
    }
  }
  SearchRole(){

  }
  addNewRole(){

  }
  LoadRoles(pageIndex:number){
    const searchModel: RoleModels = {
      searching: '',
      pageNumber: pageIndex,
      pageSize: this.pageSize,
      total: 0
    }
    this.store.dispatch(loadRole({search:searchModel}));
    this.roleSubscription=this.store.select(getRoles).subscribe((data:any)=>{
      this.roleList=data.roles;
      this.totalRows = data.total;
      console.log(data);
      //paging info start   
      this.totalRowsInList = this.roleList.length;
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
        this.pagedItems = this.LoadRoles;
    });
  }
  //Set Page
  setPaging(page: number, isPaging: boolean) {
    this.pager = this.pageService.getPager(this.totalRows, page, this.pageSize);
    if (isPaging) {
      this.LoadRoles(page);
    }
    else {
      this.pagedItems = this.roleList;
    }
  }
}
