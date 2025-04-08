import { EventEmitter, Injectable } from '@angular/core';
import { Tasks } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  taskSelected = new EventEmitter<Tasks>();

  private tasks: Tasks[] = [
    new Tasks('12881','Suresh','cement',6,'Thoppupalayam, Perundurai'),
    new Tasks('13001','Kannan','gravel',3,'kommakovil, Perundurai'),
    new Tasks('13013','Raja','cement',5,'kgvalasu, Perundurai'),
    new Tasks('13029','Harsa','gravel',2,'Papanayakanpalayam, Erode'),
    new Tasks('13047','Suresh','sand',2,'Thoppupalayam, Perundurai'),
    new Tasks('13028','Raja','gravel',3,'kgvalasu, Perundurai'),
    new Tasks('13016','Ponnusamy','cement',5,'merkuvalasu, perundurai')
  ];

  getTasks() {
    return this.tasks.slice();
  }

}
