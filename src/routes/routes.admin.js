import { AdminLayout } from "../layouts";
import {
  HomeAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductsAdmin,
  DemandAdmin,
  ReportsAdmin,
  StatisticsAdmin,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductsAdmin,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
  {
    path: "/admin/demand",
    layout: AdminLayout,
    component: DemandAdmin,
  },
  {
    path: "/admin/statistics",
    layout: AdminLayout,
    component: StatisticsAdmin,
  },
  {
    path: "/admin/reports",
    layout: AdminLayout,
    component: ReportsAdmin,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UsersAdmin,
  },
];

export default routesAdmin;
