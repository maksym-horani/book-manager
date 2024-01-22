import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Book, ReadingStatus } from '../../types';
import { Rating, LinearProgress, Tooltip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const getProgressValue = (status: ReadingStatus) => {
  switch (status) {
    case ReadingStatus.None:
      return 0;
    case ReadingStatus.InProgress:
      return 50;
    case ReadingStatus.Finished:
      return 100;
    default:
      return 0;
  }
};

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
}


interface CustomToolbarProps {
  onAddNew: () => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onAddNew }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector/>
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter sx={{marginLeft: 'auto'}}/>
      <Tooltip title="Add New">
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddNew}
        >
          Add New
        </Button>
      </Tooltip>
      <Tooltip title="Export">
        <GridToolbarExport />
      </Tooltip>
    </GridToolbarContainer>
  );
};

const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onDelete, onAddNew }) => {
  const columns: GridColDef[] = [{
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 80,
      cellClassName: 'actions',
      renderCell: (params) => {
        return (
          <>
            <GridActionsCellItem icon={<EditIcon/>} label="Edit" onClick={() => onEdit(params.row)} />
            <GridActionsCellItem icon={<DeleteIcon/>} label="Delete" onClick={() => onDelete(params.row.id)} />
          </>
        );
      },
      filterable: false,
    },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 150 },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 140,
      renderCell: (params) => (
        <Rating name="read-only" value={params.value} readOnly />
      ),
    },
    {
      field: 'readingStatus',
      headerName: 'Reading Status',
      width: 130,
      renderCell: (params) => (
        <LinearProgress
          variant="determinate"
          value={getProgressValue(params.value as ReadingStatus)}
          sx={{
            height: 10,
            width: "100%",
            '& .MuiLinearProgress-bar': {
              backgroundColor: params.value === ReadingStatus.Finished ? 'green' : 'orange', // Custom colors
            },
          }}
        />
      ),
    },
    { field: 'author', headerName: 'Author', flex: 1, minWidth: 150 },
    { field: 'iban', headerName: 'IBAN', width: 150 },
    {
      field: 'publishedDate',
      headerName: 'Published Date',
      type: 'date',
      width: 130,
      valueGetter: (params) => new Date(params.value as string),
    },
    {
      field: 'addedDate',
      headerName: 'Added Date',
      type: 'date',
      width: 130,
      valueGetter: (params) => new Date(params.value as string),
    },
    {
      field: 'bookSize',
      headerName: 'Book Size',
      width: 130,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 100,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        params.value ? (params.value as string[]).join(', ') : '',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
    },
  ];

  return (
    <DataGrid
      rows={books}
      columns={columns}
      components={{
        Toolbar: () => <CustomToolbar onAddNew={onAddNew} />,
      }}
      disableRowSelectionOnClick
      sx={{border: 'none'}}
    />
  );
};

export default BookTable;