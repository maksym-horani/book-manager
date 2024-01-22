import React from 'react';
import { useBooks } from "../../hooks/useBooks";
import {Container, CircularProgress, Alert, Typography, Box, Rating, LinearProgress} from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

import './styles.css';

import { ReadingStatus } from "../../types";

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

const Reading = () => {
  const { books, isLoading, isError} = useBooks();
  const recentBooks = books?.filter(book => book.readingStatus === ReadingStatus.InProgress);
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
    <Box sx={{px: 6, py: 2}}>
      <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="reading"
        >
        {recentBooks?.map((book) => (
          <SwiperSlide key={book.id}>
            <Box key={book.id} sx={{p:3, textAlign: 'center', py:8, gap:3, alignItems:'center', display: 'flex', flexDirection: 'column', height: 'calc(100% - 128px)'}}>
              <Typography color="white" variant="h4">{book.title}</Typography>
              <LinearProgress
                variant="determinate"
                value={getProgressValue(book.readingStatus)}
                sx={{
                  marginTop: 'auto',
                  height: 10,
                  width: "60%",
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: book.readingStatus === ReadingStatus.Finished ? 'green' : 'orange',
                  },
                }}
              />
              <Rating value={book.rating} readOnly/>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default Reading;