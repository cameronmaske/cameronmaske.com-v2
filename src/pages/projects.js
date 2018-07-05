import React from 'react'

import Project from '../components/project'

const projectsData = [
    {
        name: "Noise Blocker",
        description: "Ut tristique et egestas quis ipsum suspendisse ultrices gravida. At varius vel pharetra vel. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Odio ut sem nulla pharetra.",
        image: "https://source.unsplash.com/random/800x600",
        url: "https://google.com"
    },
    {
        name: "Try Out Glasses",
        description: "Turpis nunc eget lorem dolor. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Facilisi cras fermentum odio eu feugiat pretium. Placerat duis ultricies lacus sed turpis tincidunt.",
        image: "https://source.unsplash.com/random/800x600",
        url: "https://google.com"
    },
    {
        name: "Octodocs",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium lectus quam id leo. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Feugiat in ante metus dictum at tempor commodo ullamcorper.",
        image: "https://source.unsplash.com/random/800x600",
        url: "https://google.com"
    },
]

const Projects = () => {
    const projects = projectsData.map((props) => {
        return (<Project key={props.name} {...props}/>)
    })
    console.log(projects)
    return (
        <div >
          <h1>Projects </h1>
          { projects }
        </div>
    )
}

export default Projects
