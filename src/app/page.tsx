import styles from "./page.module.css";
import Image from "next/image";
import blogTechBanner from "@/assets/logo/blog_tech_banner.png";
import car_body from "@/assets/car/car_body.png";
import tire from "@/assets/car/tire.png";
import { getAllPosts } from '@/lib/blog';
import PostSlider from "@/components/feature/post-slider/post-slider";
import SearchForm from "@/components/feature/search-form/search-form";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className={styles.container}>

      <div className={styles.title_container}>
        <div className={styles.title_wrapper}>
          <div className={styles.title_image_container}>
            <Image src={blogTechBanner} alt="logo" className={styles.title_image} />
          </div>

          <div className={styles.title_text_container}>
            <h1 className={styles.title}>Dev Log</h1>
            <p className={styles.description}>
              Sharing the latest technology and programming knowledge.
              I dive deep into cutting-edge technology trends including AI, Python, TypeScript, React, and Next.js,
              delivering practical tutorials and best practices.
              From experienced engineers to those just starting their programming journey,
              I share the knowledge I&apos;ve acquired as technology evolves.
            </p>
          </div>
        </div>

        <div className={styles.car_container}>
          <div className={styles.car_body}>
            <Image
              src={car_body}
              alt="car body"
              className={styles.car_body_image}
            />
          </div>

          <div className={styles.tire_front}>
            <Image
              src={tire}
              alt="car tire"
              className={styles.tire_front_image}
            />
          </div>

          <div className={styles.tire_rear}>
            <Image
              src={tire}
              alt="car tire"
              className={styles.tire_rear_image}
            />
          </div>
        </div>
      </div>

      <div className={styles.search_container}>
        <div className={styles.search_wrapper}>
          <div>
            <h2 className={styles.search_title}>Search</h2>
          </div>

          <SearchForm />
        </div>
      </div>

      <div className={styles.content_container}>
        <div className={styles.content_wrapper}>
          <div>
            <h2 className={styles.content_title}>Posts</h2>
          </div>

          <div>
            <PostSlider posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
