import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  
  // A tradução para "Items per page"
  override itemsPerPageLabel = 'Itens por página:';

  // A tradução para "Next page" (Bônus)
  override nextPageLabel = 'Próxima página';

  // A tradução para "Previous page" (Bônus)
  override previousPageLabel = 'Página anterior';

  // A tradução para "First page" (Bônus)
  override firstPageLabel = 'Primeira página';

  // A tradução para "Last page" (Bônus)
  override lastPageLabel = 'Última página';

  /**
   * Esta função é chamada para gerar o texto "range" (ex: "1 – 10 de 50").
   * É aqui que você traduz o "50 of 50" (que na verdade é "X – Y of Z").
   */
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      // Caso não haja itens
      return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // Se o índice inicial for maior que o total, exibe a última página.
    const realStartIndex = startIndex < length ? startIndex : (Math.ceil(length / pageSize) - 1) * pageSize;

    const endIndex = Math.min(realStartIndex + pageSize, length);

    return `${realStartIndex + 1} – ${endIndex} de ${length}`;
  };
}