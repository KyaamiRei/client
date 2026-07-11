import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./router/root-layout";
import { RootRedirect } from "./router/root-redirect";
import { GuestRoute } from "./router/guest-route";
import { ProtectedRoute } from "./router/protected-route";
import { AuthRegisterPage } from "@/pages/auth/register/page";
import { AuthLoginPage } from "@/pages/auth/login/page";
import { EventAllPage } from "@/pages/events/all/page";
import { NewEventsPage } from "@/pages/events/new/page";
import { EventDetailsPage } from "@/pages/events/details/page";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <RootRedirect /> },
      {
        element: <GuestRoute />,
        children: [
          {
            path: "login",
            element: <AuthLoginPage />,
          },
          {
            path: "register",
            element: <AuthRegisterPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "events",
            element: <EventAllPage />,
          },
          {
            path: "events/my",
            element: <h1>events/my</h1>,
          },
          {
            path: "events/new",
            element: <NewEventsPage />,
          },
          {
            path: "events/:id",
            element: <EventDetailsPage />,
          },
          {
            path: "events/:id/edit",
            element: <h1>events/:id/edit</h1>,
          },
        ],
      },
      { path: "*", element: <Navigate to={"/"} replace /> },
    ],
  },
]);
