import useSWR from 'swr';
import axios from 'axios';
import { Book } from '../types';

const baseURL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export function useBooks() {
  const { data, error, mutate } = useSWR<Book[]>('/books', fetcher);

  const addBook = async (newBook: Book) => {
    const response = await axiosInstance.post('/books', newBook);
    mutate();
    return response.data;
  };

  const updateBook = async (id: number, updatedBook: Book) => {
    const response = await axiosInstance.put(`/books/${id}`, updatedBook);
    mutate();
    return response.data;
  };

  const deleteBook = async (id: number) => {
    await axiosInstance.delete(`/books/${id}`);
    mutate();
  };

  return {
    books: data,
    isLoading: !error && !data,
    isError: error,
    addBook,
    updateBook,
    deleteBook,
  };
}