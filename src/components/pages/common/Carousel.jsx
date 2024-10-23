import { Box, IconButton } from '@mui/material';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';




const NextArrow = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 1,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};


const PrevArrow = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 1,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const Carousel = ({ items, height = 600, width = "100%", slidesToShow = 1, isVideo = true }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Box sx={{ width, overflow: "hidden", position: "relative" }}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} sx={{ height, width: "100%", overflow: "hidden" }}>
            {isVideo ? (
              <video
                src={item}
                autoPlay
                loop
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={item}
                alt={`slide-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                }}
              />
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
