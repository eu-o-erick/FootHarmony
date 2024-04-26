import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export default function BreadcrumbProducts() {

  return (
    <Breadcrumb>
      <BreadcrumbList>
    
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
    
        <BreadcrumbSeparator />
    
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
    
      </BreadcrumbList>
    </Breadcrumb>
  );
}
