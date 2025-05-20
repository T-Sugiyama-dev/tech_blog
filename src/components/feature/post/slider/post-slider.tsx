"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "./post-slider.module.css";

import { Blog } from "@/content/metadata";

// propsの型を定義
interface PostSliderProps {
  posts: Blog[];
}

// propsを受け取るように修正
export default function PostSlider({ posts }: PostSliderProps) {

  const slideSettings = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1100: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1500: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  };

  return (
    <div className={styles.swiper_container}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={slideSettings}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{
          clickable: true,
        }}
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index} style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
            <div className={styles.blog_card}>

              <div className={styles.thumbnail_container}>
                <div className={styles.thumbnail_wrapper}>
                  <h3>{post.title}</h3>
                </div>
              </div>

              <div className={styles.description_container}>
                <div className={styles.description_container_inner}>
                  <p>{post.description}</p>
                </div>

                <div className={styles.tag_container}>
                  {post.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
                <Link href={`/posts/${post.slug}`}>
                  <button className={styles.blog_card_button}>
                    Read
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}