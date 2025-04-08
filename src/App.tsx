import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register";
import PostsListingPage from "./pages/PostsListing.tsx";
import PostDetailsPage from "./pages/PostDetails.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import DefaultLayout from "./layouts/DefaultLayout.tsx";
import EditProfile from "./pages/EditProfile";
import EditPost from "./pages/EditPost.tsx";
import AuthWrapper from "./components/AuthWrapper.tsx";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout.tsx";
import TestExams from "./pages/TestExams.tsx";

function App() {
	return (
		<Routes>
			<Route element={<UnauthenticatedLayout />}>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/" element={<TestExams />} />
			</Route>

			<Route element={<AuthWrapper />}>
				<Route element={<DefaultLayout />}>
					{/* <Route path="/" element={<PostsListingPage />} /> */}
					<Route path="/posts/:id" element={<PostDetailsPage />} />
					<Route path="/posts/add" element={<CreatePostPage />} />
					<Route path="/posts/:id/edit" element={<EditPost />} />
					<Route path="/profile/edit" element={<EditProfile />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
