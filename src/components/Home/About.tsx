
import { Tag } from "../custom/Spline/Tag"


export const About = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center items-center">
      <Tag/>
      <div> 
        <div className="flex items-end pb-4">
          <h2 className="text-4xl font-thin accent proto">
           Viraj Bhartiya
            </h2>
          <p className="text-base font-thin px-3">Life Full of Pixels</p>
        </div>
        <p className="font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsa laboriosam? Enim maxime ex corrupti nihil accusantium perferendis dolor ipsam ratione ipsa velit deserunt, ad illo, explicabo quae architecto consequuntur laudantium, asperiores beatae iusto rem fugit officiis quam et autem?<br/><br/> Commodi ipsam doloribus repellendus nihil ab tempore dicta, eveniet architecto, natus voluptatum laborum sed, dolor voluptatem qui non officia dolores ullam doloremque nisi perferendis velit similique sunt! Doloribus eius, vero nostrum sapiente sit quia quo error aliquam ut dolorum quibusdam.
        </p>
      </div>
    </section>
  )
}