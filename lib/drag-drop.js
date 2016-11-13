'use babel';

import DragDropView from './drag-drop-view';
import {CompositeDisposable} from 'atom';
import {TextBuffer} from 'atom';

const DragDropUri = 'dragdrop';
var dragdropview;

export default {

  activate(state) {
    dragdropview = new DragDropView();
    this.Disposables = new CompositeDisposable();
    this.Disposables.add(atom.workspace.addOpener( function(uriToOpen){
      if(uriToOpen.endsWith(DragDropUri)){
        return dragdropview;
      }
    }));
    this.Disposables.add(atom.commands.add('atom-workspace', {
      'drag-drop:open': () => this.open()
    }));
    this.Disposables.add(atom.commands.add('atom-workspace', {
      'drag-drop:save': () => this.save()
    }));
    atom.workspace.onDidOpen(function(e) {
                dragdropview.invoke();
    });
    atom.workspace.onDidChangeActivePaneItem(this.reloadview);
  },

  deactivate() {
    this.Disposables.dispose();
  },

  serialize() {
  },

  reloadview(){
    if(atom.workspace.getActivePaneItem() == dragdropview){
      dragdropview.reloadElementDisplay();
    }
  },

  open(){
    atom.workspace.open(DragDropUri);
  },

  save(){
    txt = new TextBuffer(dragdropview.GetJasonData());
    path = atom.project.getDirectories();
    filepath = "DragDropModel.jason";
    if(path.length>0){
      filepath = path[0].path + "\\DragDropModel.jason";
    }
    txt.saveAs(filepath);
    alert("saved to" + filepath);
  }
};
