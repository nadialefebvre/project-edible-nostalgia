import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { NavLink } from 'react-router-dom'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const routes = [
  { path: '/recipes/:recipeId', breadcrumb: "Recipe" },
  { path: '/recipes/add', breadcrumb: "Add" },
  { path: '/recipes', breadcrumb: 'All' },
]

const BreadcrumbsNav = () => {
  const breadcrumbs = useBreadcrumbs(routes)

  const lastBreadcrumb = breadcrumbs.pop()

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({
        match,
        breadcrumb
      }) => (
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