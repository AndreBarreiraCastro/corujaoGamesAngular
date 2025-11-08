
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


import { Estoque } from '../../../models/estoque.model';
import { estoqueservice } from '../../../services/estoque.service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../../jogo/jogo-list/custom-paginator-intl';

@Component({
  selector: 'app-estoque-list',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatButtonModule, MatIcon, RouterLink, MatSnackBarModule,
    RouterLink, MatPaginatorModule, MatPaginatorModule],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ],
  templateUrl: './estoque-list.html',
  styleUrl: './estoque-list.css'
})
export class EstoqueList {

  displayedColumns: string[] = ['numero', 'quantidade', 'acao'];
  estoque: Estoque[] = [];
  dataSource = new MatTableDataSource(this.estoque);
  totalRecords = 0;
  page = 0;
  pageSize = 2;

  constructor(private estoqueService: estoqueservice, private snack: MatSnackBar,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.estoqueService.getEstoque(this.page, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    this.estoqueService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluir(colecao: Estoque) {

    this.estoqueService.excluir(colecao).subscribe({
      next: () => {
        this.exibirMensagem('Estado excluído com sucesso!');
         this.router.navigateByUrl('admin/estoques');
        window.location.reload();
      },
      error: (erro) => {
        this.exibirMensagem('Problema ao excluir o estado, entre em contato com o suporte!');
      }
    }
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
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}
