import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  data: {
    label: string;
    link?: string;
  }[];
}

export type BreadCrumbsProps = Props["data"];

const BreadCrumbs = ({ data = [] }: Props) => {
  return (
    <Breadcrumbs>
      {data.map(({ label, link }) =>
        link ? (
          <Link href={link} key={label}>
            <Typography color="primary">{label}</Typography>
          </Link>
        ) : (
          <Typography key={label} color="textPrimary">
            {label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
