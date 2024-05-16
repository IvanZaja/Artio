import CancelCircleIcon from '../components/icons/cancel-circle-stroke-rounded';
import CheckmarkCircle02Icon from '../components/icons/checkmark-circle-02-stroke-rounded';
import DownloadCircle01Icon from '../components/icons/download-circle-01-stroke-rounded';
import RequestsList from '../components/requests/RequestsList';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

function RequestsCompany() {
    let tabs = [
        {
          id: "Received",
          label: <div className="flex gap-3 items-center"><DownloadCircle01Icon/> Received</div>,
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