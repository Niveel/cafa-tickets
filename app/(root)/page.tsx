import { Landing, HomeCategoryBar, SoonEvents, HomeEvents } from "@/components"
import { getEventCategories } from "../lib/general"
import { getEvents } from "../lib/events";

const HomePage = async () => {
  const [categories, events] =  await Promise.all([ 
    getEventCategories(),
    getEvents({ status: 'upcoming', ordering: 'start_date', page: 1 })
  ]);

  return (
    <main>
      <Landing />
      <HomeCategoryBar eventCategories={categories} />
      <SoonEvents events={events.results} />
      <HomeEvents events={events.results} />
    </main>
  )
}

export default HomePage 