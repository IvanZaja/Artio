import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { Link } from "react-router-dom"
import RequestsList from "../components/requests/RequestsList";
import Share04Icon from "../components/icons/share-04-stroke-rounded";
import CancelCircleIcon from "../components/icons/cancel-circle-stroke-rounded";
import CheckmarkCircle02Icon from "../components/icons/checkmark-circle-02-stroke-rounded";

function RequestsHost() {

    let tabs = [
        {
          id: "Sent",
          label: <div className="flex gap-3 items-center"><Share04Icon /> Sent</div>,
          content: <div><RequestsList status={'Sent'}/></div>
        },
        {
          id: "Rejected",
          label: <div className="flex gap-3 items-center"><CancelCircleIcon /> Rejected</div>,
          content: <div><RequestsList status={'Rejected'}/></div>
        },
        {
          id: "Accepted",
          label: <div className="flex gap-3 items-center"><CheckmarkCircle02Icon /> Accepted</div>,
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