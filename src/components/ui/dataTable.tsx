import { FC, CSSProperties, useState } from 'react';
import Table from './table/table';
import TableHeader from './table/tableHeader';
import TableBody from './table/tableBody';
import TableRow from './table/tableRow';
import TableHead from './table/tableHead';
import TableCell from './table/tableCell';
import Pagination from './pagination/pagination';
import PaginationContent from './pagination/paginationContent';
import PaginationItem from './pagination/paginationItem';
import PaginationButton from './pagination/paginationButton';
import PaginationPrevious from './pagination/paginationPrevious';
import PaginationNext from './pagination/paginationNext';
import Select from './inputs/select';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => JSX.Element;
  width?: CSSProperties['width'];
  minWidth?: CSSProperties['minWidth'];
}

export interface DataTableProps {
  columns: Column[];
  data: any[];
}

const DataTable: FC<DataTableProps> = ({ columns, data }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setPageIndex(page);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.accessor}
                style={{ width: column.width, minWidth: column.minWidth }}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell
                  key={column.accessor}
                  style={{ width: column.width, minWidth: column.minWidth }}
                >
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex mt-4">
        <Select
          options={[
            { label: '5 / صفحه', value: 5 },
            { label: '10 / صفحه', value: 10 },
            { label: '20 / صفحه', value: 20 },
          ]}
          className="min-w-[110px]"
          value={pageSize}
          onChange={(e) => setPageSize(+e.target.value)}
        />
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  {page === pageIndex ? (
                    <PaginationButton isActive>{page}</PaginationButton>
                  ) : (
                    <PaginationButton onClick={() => handlePageChange(page)}>
                      {page}
                    </PaginationButton>
                  )}
                </PaginationItem>
              )
            )}
            <PaginationNext
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex === totalPages}
            />
          </PaginationContent>
        </Pagination>
        <div className="min-w-[110px]" />
      </div>
    </div>
  );
};

export default DataTable;
