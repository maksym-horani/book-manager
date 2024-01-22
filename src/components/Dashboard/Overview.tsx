import React from 'react';
import { useBooks } from "../../hooks/useBooks";
import {Container, CircularProgress, Alert, Typography, Box, Rating, LinearProgress} from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

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

const Overview = () => {
  const { books, isLoading, isError} = useBooks();
  const recentBooks = books?.slice(-7);
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
    <Box className="overview">
      <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="overview"
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

export default Overview;