import RequestsList from '../components/requests/RequestsList';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

function RequestsCompany() {
    let tabs = [
        {
          id: "Received",
          label: "Received",
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
        <div className="w-full">
            <Tabs color={"success"} aria-label="Tabs colors" className='mx-8' items={tabs} radius="full">
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <Card className="flex mx-8">
                            <CardBody>
                                {item.content}
                            </CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs>
        </div>
    </div>
  )
}

export default RequestsCompany;