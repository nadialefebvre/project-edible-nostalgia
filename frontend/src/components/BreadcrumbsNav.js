import React from "react"
import { NavLink } from "react-router-dom"
import useBreadcrumbs from "use-react-router-breadcrumbs"

import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"

import {routes} from "../utils/arrays"

const BreadcrumbsNav = () => {
  const breadcrumbs = useBreadcrumbs(routes)

  const lastBreadcrumb = breadcrumbs.pop()

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <Link
          key={match.pathname}
          component={NavLink}
          underline="hover"
          color="secondary"
          href={match.pathname}
          to={match.pathname}
        >
          {breadcrumb}
        </Link>
      ))}
      <Typography color="text.primary">
        {lastBreadcrumb.breadcrumb.props.children}
      </Typography>
    </Breadcrumbs>
  )
}

export default BreadcrumbsNav
