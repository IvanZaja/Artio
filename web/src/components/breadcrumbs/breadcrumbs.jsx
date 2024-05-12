import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {ShoppingCartIcon} from "./ShoppingCartIcon";
import { useState } from "react";

function BreadcrumbsPay({ current, project }) {
    

  return (
    <Breadcrumbs
    underline="hover"
    classNames={{
      list: "shadow-small",
    }}
    itemClasses={{
      item: "text-black/60 data-[current=true]:text-black",
      separator: "text-black/40",
    }}
    variant="bordered"
    radius="full"
  >
    <BreadcrumbItem href="#shopping-cart">
      <ShoppingCartIcon />
    </BreadcrumbItem>
    <BreadcrumbItem href={`/invest/${project?.id}`} isCurrent={current === "invest"}>Invest</BreadcrumbItem>
    <BreadcrumbItem href={`/invest/${project?.id}/checkout`} isCurrent={current === "checkout"}>Checkout</BreadcrumbItem>
    <BreadcrumbItem href={`/invest/${project?.id}/payment`} isCurrent={current === "payment"}>Payment</BreadcrumbItem>
  </Breadcrumbs>
  )
}

export default BreadcrumbsPay