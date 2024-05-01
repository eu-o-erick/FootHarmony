import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export default function BreadcrumbProducts() {

  return (
    <Breadcrumb>
      <BreadcrumbList className="!gap-2 max-sm:!gap-1 max-sm:!text-xs">
    
        <BreadcrumbItem>
          <BreadcrumbLink href="/">HOME</BreadcrumbLink>
        </BreadcrumbItem>
    
        <BreadcrumbSeparator />
    
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">PRODUCTS</BreadcrumbLink>
        </BreadcrumbItem>
    
      </BreadcrumbList>
    </Breadcrumb>
  );
};
