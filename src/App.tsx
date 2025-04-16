
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Intro from "./pages/Intro";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TeamNameSearch from "./pages/TeamNameSearch";
import AISuggestions from "./pages/AISuggestions";
import Reservation from "./pages/Reservation";
import LogoCreation from "./pages/LogoCreation";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<TeamNameSearch />} />
          <Route path="/suggestions" element={<AISuggestions />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/logo" element={<LogoCreation />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
