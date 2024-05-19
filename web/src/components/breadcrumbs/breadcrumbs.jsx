import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {ShoppingCartIcon} from "./ShoppingCartIcon";

function BreadcrumbsPay({ current, project }) {
    

  return (
    <Breadcrumbs
    underline="hover"
    itemClasses={{
      item: "text-black/60 data-[current=true]:text-black",
      separator: "text-black/40",
    }}
    variant="light"
    radius="full"
    className="shadow-none"
  >
    <BreadcrumbItem href="#shopping-cart">
      <ShoppingCartIcon />
    </BreadcrumbItem>
    <BreadcrumbItem href={`/invest/${project?.id}`} isCurrent={current === "invest"}>Invest</BreadcrumbItem>
    <BreadcrumbItem href={`/invest/${project?.id}/checkout`} isCurrent={current === "payment"}>Payment</BreadcrumbItem>
    <BreadcrumbItem href={`/invest/${project?.id}/thanks`} isCurrent={current === "thanks"}>Done!</BreadcrumbItem>
  </Breadcrumbs>
  )
}

export default BreadcrumbsPay