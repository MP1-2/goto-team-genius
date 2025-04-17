
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo) {
      setIsLoggedIn(true);
      // If logged in, redirect to the application main flow
      navigate("/search", { replace: true });
    } else {
      // If not logged in, show the marketing homepage
      setIsLoading(false);
    }
  }, [navigate]);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading GotoGuys...</p>
        </div>
      </div>
    );
  }

  // If not logged in and not loading, show the marketing homepage
  return <Home />;
};

export default Index;
