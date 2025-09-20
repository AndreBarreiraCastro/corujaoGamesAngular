import { Component } from '@angular/core';
import { Plataforma } from '../../../models/plataforma.model';
import { PlataformaService } from '../../../services/plataforma.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-plataforma-list',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatButtonModule, MatIcon,RouterLink, MatSnackBarModule,
   RouterLink],
  templateUrl: './plataforma-list.html',
  styleUrl: './plataforma-list.css'
})
export class PlataformaList {
 displayedColumns: string[] = ['numero', 'nome', 'acao'];
 plataforma: Plataforma[] = [];
  dataSource = new MatTableDataSource(this.plataforma);

  constructor(private plataformaService: PlataformaService,private snack: MatSnackBar,
     private router: Router
  ){

  }

  ngOnInit(): void {
      this.plataformaService.getPlataforma().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      })
  }

  applyFilter(event: Event){
    const filterValue =(event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    excluir(plataforma: Plataforma) {
      
        this.plataformaService.excluir(plataforma).subscribe({
           next: () => {
             this.exibirMensagem('Estado excluído com sucesso!');
            // this.router.navigateByUrl('/plataformas');
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
