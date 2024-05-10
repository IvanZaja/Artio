import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { Link } from "react-router-dom"
import RequestsList from "../components/requests/RequestsList";

function RequestsHost() {

    let tabs = [
        {
          id: "Sent",
          label: "Sent",
          content: <div><RequestsList status={'Sent'}/></div>
        },
        {
          id: "Rejected",
          label: "Rejected",
          content: <div><RequestsList status={'Rejected'}/></div>
        },
        {
          id: "Accepted",
          label: "Accepted",
          content: <div><RequestsList status={'Accepted'}/></div>
        }
    ];

  return (
    <div className="flex">
        <div>
            <Tabs color={"success"} aria-label="Tabs colors" items={tabs} radius="full">
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <Card className="flex">
                            <CardBody>
                                {item.content}
                            </CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs>
        </div>
    
        <Link to="/create-request">
            <Button variant="shadow" color="primary">New request</Button>
        </Link>
    </div>
  )
}

export default RequestsHost