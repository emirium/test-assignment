import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PostsList } from "@/components/posts/PostsList";
import { CreatePostForm } from "@/components/posts/CreatePostForm";
import { EditPostForm } from "@/components/posts/EditPostForm";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-gray-100 border-b">
            <nav>
              <div className="container mx-auto py-4">
                <h1 className="text-2xl text-gray-600 font-semibold">
                  Task - React/Typescript/Redux App
                </h1>
              </div>
            </nav>
          </header>
          <section className="container mx-auto flex-1 py-10">
            <Routes>
              <Route path="/" element={<Navigate to="/posts" replace />} />
              <Route path="/posts" element={<PostsList />} />
              <Route path="/posts/new" element={<CreatePostForm />} />
              <Route path="/posts/:id/edit" element={<EditPostForm />} />
            </Routes>
          </section>
          <footer className="py-2 bg-gray-100">
            <div className="container mx-auto">
              <p className="text-sm text-gray-600 font-semibold tracking-tight">
                &copy; Emir Smajic
              </p>
            </div>
          </footer>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
