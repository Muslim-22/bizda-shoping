
import CategoryDetail from '../../../components/Categories'
import HeroSlider from './HeroSlider'
import HomePromos from './HomePromos'
export default async function HeroSection() {


    return (
        <div className='mb-7'>
            <CategoryDetail />
            <HeroSlider></HeroSlider>
            {/* <HomePromos /> */}
        </div>
    )
}
