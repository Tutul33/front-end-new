import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SearchModel } from 'src/app/models/commonModels/search.model';
import { Modules } from 'src/app/models/moudleNodels/modules.model';
import { PagerService } from 'src/app/services/commonServices/paginator.service';
import { AppState } from 'src/app/store/app.state';
import { deleteModule, loadMenu, loadModule } from '../state/module.actions';
import { getModulesAll } from '../state/module.selector';
import { AddEditModuleComponent } from './add-edit-module/add-edit-module.component';
import { environment } from 'src/environments/environment';
import { loadRoles } from 'src/app/auth/state/auth.actions';


@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
  providers:[PagerService]
})
export class ModulesComponent implements OnInit,OnDestroy{
  displayedColumns: string[] = ['moduleName', 'modulePath', 'moduleIcon', 'moduleSequence','descrioption','moduleColor','actions'];
  dataSource: any = [];
  modulesSubscription?:Subscription;
  moduleList: Modules[]=[];
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
      this.loadModules(0);
    }else{
      this.searchStr='';
      this.isPaging=true;
      this.loadModules(0);
    }
  }
  ngOnDestroy(): void {
    this.modulesSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.loadModules(0);
    this.loadRoles();
  }
  loadRoles(){
    this.store.dispatch(loadRoles());
  }
  clearAll(){
    this.searchStr='';
  }
  addNewModule(){
    const module: Modules = {
      moduleId: 0,
      moduleName: '',
      description: '',
      moduleIcon: '',
      moduleColor: '',
      modulePath: '',
      moduleSequence: 0
    }
   this.openDialog(module);
  }
  EditModule(event:Event,module:Modules){
    this.openDialog(module);
  }
  openDialog(module:Modules): void {
    const dialogRef = this.dialog.open(AddEditModuleComponent, {
      width: '700px',
      data: module,
      exitAnimationDuration:environment.exitAnimationDuration,
      enterAnimationDuration:environment.enterAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {      
      this.isPaging=true;
      if(module.moduleId as number>0){
        this.loadModules(this.pageNumber);      
      }else{
        this.loadModules(0);      
      }      
    });
  }
  DeleteModule(event:Event,module:Modules){
    if (confirm("Are you sure to delete this record?")) {
      this.store.dispatch(deleteModule({id:module.moduleId as number}));
      this.isPaging=true;
      this.loadModules(0);     
     }
  }
  loadModules(pageIndex: number) {
    this.pageNumber=pageIndex;
    const searchModel: SearchModel = {
      searching: this.searchStr,
      pageNumber: pageIndex,
      pageSize: this.pageSize
    }
    this.store.dispatch(loadModule({search:searchModel}));
    this.modulesSubscription = this.store.select(getModulesAll).subscribe((data) => {
      if (data) {
        this.moduleList = data.modules;
        //this.dataSource = new MatTableDataSource<Modules>(this.moduleList);
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
      this.loadModules(page);
    }
    else {
      this.pagedItems = this.moduleList;
    }
  }
}
