import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { Link } from "react-router-dom"
import RequestsList from "../components/requests/RequestsList";
import Share04Icon from "../components/icons/share-04-stroke-rounded";
import CancelCircleIcon from "../components/icons/cancel-circle-stroke-rounded";
import CheckmarkCircle02Icon from "../components/icons/checkmark-circle-02-stroke-rounded";
import Add01Icon from "../components/icons/add-01-stroke-rounded";

function RequestsHost() {

    let tabs = [
        {
          id: "Sent",
          label: <div className="flex gap-3 items-center"><Share04Icon /> Sent</div>,
          content: <div><RequestsList status={'Sent'}/></div>
        },
        {
          id: "Accepted",
          label: <div className="flex gap-3 items-center"><CheckmarkCircle02Icon /> Accepted</div>,
          content: <div><RequestsList status={'Accepted'}/></div>
        },
        {
          id: "Rejected",
          label: <div className="flex gap-3 items-center"><CancelCircleIcon /> Rejected</div>,
          content: <div><RequestsList status={'Rejected'}/></div>
        }
        
    ];

  return (
    <div className="flex justify-between mx-12 mt-10">
        <div className="w-full">
            <Tabs color={'success'} variant="solid" className="" aria-label="Tabs colors" items={tabs} radius="full">
                {(item) => (
                    <Tab key={item.id} title={item.label} className="w-full">
                      <div className="w-full">
                        <Card className="w-full">
                            <CardBody className="w-full">
                                {item.content}
                            </CardBody>
                        </Card>
                      </div>
                    </Tab>
                )}
            </Tabs>

        </div>
        <Link to="/create-request" className="absolute right-12">
            <Button variant="shadow" className="rounded-full bg-[#81F18E] shadow-lg transition ease-in-out hover:bg-[#50ff64] hover:scale-105 duration-200"><Add01Icon/>New request</Button>
        </Link>
    </div>
  )
}

export default RequestsHost