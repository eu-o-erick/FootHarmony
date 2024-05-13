import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

export interface BreadCrumbElement {
  label?: string;
  href?: string;
};

interface Props {
  elements: BreadCrumbElement[];
  classNames?: string;
};

export default function BreadcrumbComponent({ elements, classNames }: Props) {

  return (
    <Breadcrumb>
      <BreadcrumbList className={"!gap-1.5 max-sm:!gap-1 max-sm:!text-xs text-gray-950 uppercase " + classNames}>

        { elements.map(({label, href}, i) => (
          <Fragment key={i}>
            <BreadcrumbItem key={i}>
              { (href && i + 1 < elements.length) ?
                <Link href={href}>{label}</Link>
                :
                <span className="uppercase text-gray-500">{label}</span>
              }
            </BreadcrumbItem>

            { i + 1 < elements.length && <BreadcrumbSeparator /> }
          </Fragment>
        )) }

      </BreadcrumbList>
    </Breadcrumb>
  );
};
