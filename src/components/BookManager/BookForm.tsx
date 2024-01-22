import React, {useRef} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
  Chip,
  Autocomplete,
  Rating,
  Box,
  Typography
} from '@mui/material';
import { Book, BookSize, ReadingStatus } from '../../types';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string(),
  iban: yup.string(),
  publishedDate: yup.string(),
  readingStatus: yup.string().required('Reading status is required'),
  category: yup.array().of(yup.string()),
  bookSize: yup.string(),
  description: yup.string(),
  price: yup.number().min(0),
  quantity: yup.number().min(1).required('Quantity is required'),
  rating: yup.number().min(0).max(5),
});

interface BookFormProps {
  book?: Book;
  onSubmit: (values: Book) => void;
  onCancel?: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      id: book?.id || Date.now(),
      title: book?.title || '',
      author: book?.author || '',
      iban: book?.iban || '',
      publishedDate: book?.publishedDate || '',
      addedDate: book?.addedDate || new Date().toISOString().split('T')[0],
      readingStatus: book?.readingStatus || ReadingStatus.None,
      category: book?.category || [],
      bookSize: book?.bookSize || BookSize.Other,
      description: book?.description || '',
      price: book?.price || 0,
      quantity: book?.quantity || 1,
      rating: book?.rating || 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const submitRef = useRef<HTMLButtonElement>(null);

  const submit = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  }

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  }
  return (
    <>
      <DialogContent>
        <form onSubmit={onSubmitForm}>
          <button type="submit" ref={submitRef} hidden>sdf</button>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2, p: 2, border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: 1, gap: 1}}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formik.values.rating}
                          onChange={(event, newValue) => {
                  formik.setFieldValue('rating', newValue);
                }}
              />
            </Box>
            <TextField
              fullWidth
              id="author"
              name="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="iban"
              name="iban"
              label="IBAN"
              value={formik.values.iban}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="publishedDate"
              name="publishedDate"
              label="Published Date"
              type="date"
              value={formik.values.publishedDate}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth error={formik.touched.readingStatus && Boolean(formik.errors.readingStatus)}>
              <InputLabel id="reading-status-label">Reading Status</InputLabel>
              <Select
                labelId="reading-status-label"
                label="Reading Status"
                id="readingStatus"
                name="readingStatus"
                value={formik.values.readingStatus}
                onChange={formik.handleChange}
                required
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Finished">Finished</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.readingStatus && formik.errors.readingStatus}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="book-size-label">Book Size</InputLabel>
              <Select
                labelId="book-size-label"
                label="Book Size"
                id="bookSize"
                name="bookSize"
                value={formik.values.bookSize}
                onChange={formik.handleChange}
              >
                <MenuItem value="Magazine">Magazine</MenuItem>
                <MenuItem value="Novel">Novel</MenuItem>
                <MenuItem value="Textbook">Textbook</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              required
            />
            <Autocomplete
              multiple
              id="category"
              options={[
                "Academic", "Mythological", "Motivational", "Biographices", "Fiction", "Art & Design"
              ]}
              freeSolo
              value={formik.values.category}
              onChange={(event, value) => formik.setFieldValue('category', value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Category"
                  placeholder="Add a category"
                />
              )}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="flex-end" m={2}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Stack>
      </DialogActions>
    </>
  );
};

export default BookForm;