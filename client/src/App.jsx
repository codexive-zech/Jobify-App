import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
const Error = lazy(() => import("./pages/Error"));
const HomeLayout = lazy(() => import("./pages/HomeLayout"));
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AddJob = lazy(() => import("./pages/AddJob"));
const AllJobs = lazy(() => import("./pages/AllJobs"));
const Admin = lazy(() => import("./pages/Admin"));
const Stats = lazy(() => import("./pages/Stats"));
const Profile = lazy(() => import("./pages/Profile"));
const EditJob = lazy(() => import("./pages/EditJob"));
const Testing = lazy(() => import("./pages/Testing"));

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as testingAction } from "./pages/Testing";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorElement from "./components/ErrorElement";
import { Loading } from "./components";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <HomeLayout />,
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <Error />,
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Landing />,
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
        action: registerAction,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
        action: loginAction(queryClient),
      },
      {
        path: "testing",
        element: <Testing />,
        action: testingAction,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardLayout queryClient={queryClient} />
          </Suspense>
        ),
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <AddJob />
              </Suspense>
            ),
            action: addJobAction(queryClient),
          },
          {
            path: "stats",
            element: (
              <Suspense fallback={<Loading />}>
                <Stats />
              </Suspense>
            ),
            loader: statsLoader(queryClient),
            errorElement: (
              <Suspense fallback={<Loading />}>
                <ErrorElement />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            ),
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: (
              <Suspense fallback={<Loading />}>
                <Admin />
              </Suspense>
            ),
            loader: adminLoader,
          },
          {
            path: "all-jobs",
            element: (
              <Suspense fallback={<Loading />}>
                <AllJobs />
              </Suspense>
            ),
            loader: allJobsLoader(queryClient),
            errorElement: (
              <Suspense fallback={<Loading />}>
                <ErrorElement />
              </Suspense>
            ),
          },
          {
            path: "edit-job/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <EditJob />
              </Suspense>
            ),
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          { path: "delete-job/:id", action: deleteJobAction(queryClient) },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
