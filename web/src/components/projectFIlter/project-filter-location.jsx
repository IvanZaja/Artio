import { Divider, Select, SelectItem } from "@nextui-org/react"

function ProjectFilterLocation({ location, onHandleLocation }) {
  return (
    <div>
      <Select
        label="Location"
        placeholder="Select a location"
        className="max-w-xs mx-5 py-4 lg:min-w-96"
      >
        
        {location.map((project, index) => (
          <SelectItem className="" key={index} value={project.country} onClick={() => onHandleLocation(index)}>
            {project.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default ProjectFilterLocation;