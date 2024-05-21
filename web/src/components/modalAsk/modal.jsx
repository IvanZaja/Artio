import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import HelpCircleIcon from "../icons/help-circle-stroke-rounded";

export default function ModalAsk() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="rounded-full" onPress={onOpen}><HelpCircleIcon/></Button>
      <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              
              <div className="flex">
              <div className="max-h-96 max-w-64 my-5 ml-5">
                    <img className="h-full w-full rounded-xl shadow-lg" src='https://res.cloudinary.com/djfnazn3y/image/upload/v1715166327/Artio/z4mb1dtrlpsa60rpm07l.gif'/>
                </div>
                <div>
                <ModalHeader className="flex flex-col gap-1">How do I find the latitude and longitude?</ModalHeader>
                    <ModalBody>
                        <p> 
                            That is easy! You just have to search for the place on Google Maps, and then right click on the marker.
                        </p>
                        <p>
                            Click on the first option, and you will have the Latitude and Longitude copied.
                        </p>
                        <p>
                            Paste them in the order in which they were given to you and that&apos;s it!
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" size="lg" className="rounded-full" onPress={onClose}>
                            Done
                        </Button>
                    </ModalFooter>
                </div>
                
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}