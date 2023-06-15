import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles/styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const TopSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <div className="2xl:h-[800px] xl:h-[700px] lg:h-[600px] md:h-[500px] h-[400px]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="absolute lg:text-4xl text-xl  dark:bg-slate-800 dark:text-white  bg-slate-50 text-sky-400 py-12 px-8 rounded-3xl lg:w-1/4 left-16 bottom-1/4 font-bold">
              <h1 className="lg:text-2xl   border">This is</h1>{" "}
              <div className="border-b-8 ">Creative Design School</div>
            </div>
            {/* change */}
            <img src="https://shorturl.at/qsFQ4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://graphics-illustrations.com/wp-content/uploads/2023/04/graphicsillustrations_colors01.jpg" />
          </SwiperSlide>

          <SwiperSlide>
            {/* change */}
            <img src="https://img.freepik.com/free-vector/flat-background-autumn-celebration_23-2149596504.jpg?w=1380&t=st=1686141598~exp=1686142198~hmac=ca8c1ac8f515c7a96fc7efec86022a640e75a0254b60d9070a0e25a7ac19b49a" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://img.freepik.com/premium-photo/paper-craft-red-fox-origami-fox-red-background-digital-art-paper-red-fox-design-element_127675-3235.jpg?w=2000" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://as1.ftcdn.net/v2/jpg/05/50/50/56/1000_F_550505634_JdUccweBcIazJgasCKSo8tb3LYTF2wZ5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://img.freepik.com/premium-photo/horizontal-floral-pattern-abstract-digital-illustration-painting_743855-3549.jpg?w=1380" />
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default TopSlider;
