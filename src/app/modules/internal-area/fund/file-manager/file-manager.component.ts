import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { FileManagerService } from '../../services/file-manager.service';
import { IFileModel } from '../../models/file.model';
import { ActivatedRoute } from '@angular/router';

export class TreeNode {
  children: BehaviorSubject<TreeNode[]>;
  constructor(public item: string, children?: TreeNode[],
    public type?: string, public isRoot: boolean = false,
    public fileNo: number = 0, public size: number = 0, public lastModified: string = ''
  ) {
    this.children = new BehaviorSubject(children ?? []);
  }
}

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})

export class FileManagerComponent implements OnInit {

  checkAll: boolean = false;

  treeControl: NestedTreeControl<TreeNode>;

  docTypeName?: string;

  dataSource: MatTreeNestedDataSource<TreeNode>;

  currentData: TreeNode[] = [];


  constructor(
    private fileManagerService: FileManagerService,
    private activatedRoute: ActivatedRoute) {

    this.treeControl = new NestedTreeControl<TreeNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
  }

  ngOnInit(): void {
    this.getDatas();
    this.getCurrentDocTypeName();
  }

  getDatas() {
    this.fileManagerService.getFile(this.getCurrentClientId(), this.getFileTypeId()).subscribe((result) => {
      this.currentData.push(this.generateNode(result, true));
      this.dataSource.data = this.currentData;
      this.treeControl.expand(this.currentData[0]);
    });
  }

  getCurrentDocTypeName() {
    this.fileManagerService.getDocTypeName(this.getCurrentClientId(), this.getFileTypeId()).subscribe((result) => {
      this.docTypeName = result;
    });
  }

  getCurrentClientId() {
    return this.activatedRoute.snapshot.params['clientId'];
  }

  getFileTypeId() {
    return this.activatedRoute.snapshot.params['docId'];
  }

  generateNode(model: IFileModel, isRoot: boolean = false): TreeNode {
    let children = new Array<TreeNode>();
    for (let i in model.Childs ?? []) {
      children.push(this.generateNode(model.Childs[i]));
    }
    let newNode = new TreeNode(model.Name, children, model.Type, isRoot, model.FileNo, model.Size, model.LastModified);
    return newNode;
  }

  getChildren = (node: TreeNode) => {
    return node.children;
  };

  isFolder = (index: number, node: TreeNode) => {
    return node.type == 'folder'
  }
}
