import { Select, SelectItem } from "@nextui-org/react"

function ProjectFilterLocation({ location }) {
  return (
    <div>
        <Select
        label="Location"
        placeholder="Select a location"
        className="max-w-xs mx-5 py-4 lg:min-w-96"
      >
        {location.map((project) => (
          <SelectItem key={project.id} value={project.value}>
            {project.placeName}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default ProjectFilterLocation;