import { Component, OnInit } from '@angular/core';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-estado-list',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule],
  templateUrl: './estado-list.component.html',
  styleUrl: './estado-list.component.css'
})
export class EstadoListComponent implements OnInit{
  estados: Estado[] = [];
displayedColumns: string[]= ['numero','nome','sigla'];
dataSource= new MatTableDataSource(this.estados);
  constructor(private estadoService: EstadoService){

  }
  ngOnInit(): void {
   this.estadoService.getEstados().subscribe(data => {

  this.dataSource = new MatTableDataSource(data)})  
  }
 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
