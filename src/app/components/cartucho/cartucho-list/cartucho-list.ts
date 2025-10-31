
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


import { Cartucho } from '../../../models/cartucho.model';
import { cartuchoservice } from '../../../services/cartucho.service';

@Component({
  selector: 'app-cartucho-list',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatButtonModule, MatIcon,RouterLink, MatSnackBarModule,
   RouterLink],
  templateUrl: './cartucho-list.html',
  styleUrl: './cartucho-list.css'
})
export class CartuchoList {

    displayedColumns: string[] = ['numero', 'desenvolvedora','modoJogo', 'acao'];
 cartucho: Cartucho[] = [];
  dataSource = new MatTableDataSource(this.cartucho);

  constructor(private cartuchoService: cartuchoservice,private snack: MatSnackBar,
     private router: Router
  ){

  }

  ngOnInit(): void {
      this.cartuchoService.getCartucho().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      })
  }

  applyFilter(event: Event){
    const filterValue =(event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    excluir(cartucho: Cartucho) {
      
        this.cartuchoService.excluir(cartucho).subscribe({
           next: () => {
             this.exibirMensagem('Estado excluído com sucesso!');
            // this.router.navigateByUrl('/cartuchos');
            //window.location.reload();
            },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o estado, entre em contato com o suporte!');
          }}
        )
      
    }
  exibirMensagem(mensagem: string): void {
  const snackRef = this.snack.open(mensagem, 'OK', { 
    duration: 200000,
    horizontalPosition: 'center',
    verticalPosition: 'top' 
  });

      // Caso o usuário clique no botão "OK"
  snackRef.onAction().subscribe(() => {
    window.location.reload();
  });

  // Caso o usuário NÃO clique, recarrega ao fechar automaticamente (10s)
  snackRef.afterDismissed().subscribe(info => {
    if (!info.dismissedByAction) {
      window.location.reload();
    }
  });
  }

}
