import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/usePost";
import PostDetail from "./components/usePostDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
    </Router>
  );
};

export default App;