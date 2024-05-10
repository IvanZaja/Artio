import { Button } from '@nextui-org/react'
import Title from '../components/home/title/title';
import Subtitle from '../components/home/subtitle/subtitle';
import TopProjects from '../components/home/top-projects/top-projects';
import TopUsers from '../components/home/top-users/TopUsers';
import TopCompanies from '../components/home/top-companies/TopCompanies';


function Home() {
  return (
    <>
      <div className='container mx-auto px-10'>
        <Title />
        <Subtitle />
        <TopProjects />
        <TopUsers />
        <TopCompanies />
      </div>
    </>
  )
}

export default Home;