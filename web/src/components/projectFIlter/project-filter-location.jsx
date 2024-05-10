import { Select, SelectItem } from "@nextui-org/react"

function ProjectFilterLocation({ location, onHandleLocation }) {
  return (
    <div>
        <Select
        label="Location"
        placeholder="Select a location"
        className="max-w-xs mx-5 py-4 lg:min-w-96"
      >
        {location.map((project, index) => (
          <SelectItem key={project.id} value={project.value} onClick={() => onHandleLocation(index)}>
            {project.placeName}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default ProjectFilterLocation;