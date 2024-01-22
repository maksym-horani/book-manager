import React, { useState } from 'react';
import { Container, Dialog, DialogTitle, CircularProgress, Alert } from '@mui/material';
import BookForm from './BookForm';
import BookTable from "./BookTable";
import { useBooks } from "../../hooks/useBooks";
import { Book, ReadingStatus, BookSize } from "../../types";

function BookManager() {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { books, isLoading, isError, addBook, updateBook, deleteBook } = useBooks();
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleAddBookSubmit = async (values: Book) => {
    await addBook(values);
    closeEditDialog();
  };

  const handleEditBookSubmit = async (values: Book) => {
    if (editingBook) {
      await updateBook(editingBook.id, values);
      closeEditDialog();
    }
  };

  const openEditDialog = (book: Book | null) => {
    setEditingBook(book);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditingBook(null);
    setEditDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    await deleteBook(id);
  };

  const newBookInitialValues: Book = {
    id: 0,
    title: '',
    author: '',
    iban: '',
    publishedDate: '',
    readingStatus: ReadingStatus.None,
    category: [],
    bookSize: BookSize.Other,
    description: '',
    price: 0,
    quantity: 1,
    rating: 0,
    addedDate: new Date().toISOString().split('T')[0],
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">Error fetching books!</Alert>
      </Container>
    );
  }


  return (
      <>
        <BookTable books={books || []} onEdit={openEditDialog} onDelete={handleDelete} onAddNew={() => openEditDialog(null)}/>
        <Dialog open={isEditDialogOpen} onClose={closeEditDialog} maxWidth="md" fullWidth>
          <DialogTitle>{editingBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
          <BookForm
            book={editingBook || newBookInitialValues}
            onSubmit={editingBook ? handleEditBookSubmit : handleAddBookSubmit}
            onCancel={closeEditDialog}
          />
        </Dialog>
      </>
  );
}

export default BookManager;
