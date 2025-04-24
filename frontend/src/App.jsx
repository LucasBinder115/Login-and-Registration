import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//Importing Components

//Importing Contexts

//General Layout
const Layout = () => {
  return (
    <div className="relative z-0 w-screen">
      <SidebarContextState>
        <SongContextState>
          <FetchContextState>
            <Navbar />
            <QueueContextState>
            <div className="">
              <Outlet />
            </div>
            <div className="">
              <AudioPlayer />
            </div>
            </QueueContextState>
          </FetchContextState>
        </SongContextState>
      </SidebarContextState>
    </div>
  );
};

//Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/upload",
        element: <UploadSong />,
      },
      {
        path: "/explore",
        element: <Songs />,
      },
      {
        path: "/playlists",
        element: <CreatePlayList />,
      },
      {
        path: "/playlist/:id",
        element: <Playlist />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default App;
