import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { useState } from "react";

function PaymentMethod() {
    const [selected, setSelected] = useState("credit-card");

    return (
        <div className="flex flex-col items-center w-full">
            <Card className="w-full h-fit bg-transparent border-0 shadow-none">
                <CardBody className="w-full h-[360px] overflow-hidden">
                    <Tabs
                    fullWidth
                    className="h-[80px]"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    >
                        <Tab key="credit-card" className="h-[70px]" title={
                        <div className="flex flex-col items-center">
                            <img className="w-10" src="https://res.cloudinary.com/djfnazn3y/image/upload/v1715595824/Artio/nivlf2ccz3kmmfmtzihs.png"/>
                            <span>Credit card</span>
                        </div>}>
                            <form className="flex flex-col gap-4">
                                <Input label="Name on card"  type="text" />
                                <Input label="Credit card number" type="number" />
                                <div className="flex gap-3">
                                    <Input label="Expiry date" placeholder="MM/YY" type="number" />
                                    <Input label="CVC" placeholder="***" type="number" />
                                </div>
                                <p className="mt-1 text-xs">🔒 Your credit card information is encrypted.</p>
                            </form>
                        </Tab>
                        <Tab key="paypal" className="h-[70px]" title={
                        <div className="flex flex-col items-center">
                            <img className="w-8 h-8" src="https://res.cloudinary.com/djfnazn3y/image/upload/v1715596024/Artio/tahd5jst11l9w1r72y9o.png"/>
                            <span className="mt-1">Paypal</span>
                        </div>}>
                            <form className="flex flex-col gap-4 h-fit">
                                <Input label="Paypal email" type="email" />
                                <Input label="Password" type="password" />
                                <div className="flex mt-2 gap-2 justify-end">
                                    <Button fullWidth color="primary">
                                    Sign up
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}

export default PaymentMethod