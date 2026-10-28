
import { getBanners } from "../../../services/getBanners";
import SwiperList from "./SwiperList";

export default async function HeroSlider() {
  const data = await getBanners();
  console.log(data)
  return (
    <SwiperList data={data} />
  );
}