import { AdminLayout } from "../layouts";
import {
  HomeAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductsAdmin,
  FabricsAdmin,
  DemandAdmin,
  ReportsAdmin,
  StatisticsAdmin,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/",
    layout: AdminLayout,
    component: HomeAdmin,
  },
  {
    path: "/products",
    layout: AdminLayout,
    component: ProductsAdmin,
  },
  {
    path: "/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
  {
    path: "/fabrics",
    layout: AdminLayout,
    component: FabricsAdmin,
  },
  {
    path: "/demand",
    layout: AdminLayout,
    component: DemandAdmin,
  },
  {
    path: "/statistics",
    layout: AdminLayout,
    component: StatisticsAdmin,
  },
  {
    path: "/reports",
    layout: AdminLayout,
    component: ReportsAdmin,
  },
  {
    path: "/users",
    layout: AdminLayout,
    component: UsersAdmin,
  },
];

export default routesAdmin;
