import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KoreanLanding from "./pages/KoreanLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [fatalError, setFatalError] = useState<string | null>(null);

  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
      setFatalError("예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      event.preventDefault();
    };

    const onError = (event: ErrorEvent) => {
      console.error("Runtime error:", event.error || event.message);
      setFatalError("페이지 로딩 중 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.");
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onError);

    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  if (fatalError) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 text-center">
        <div className="max-w-xl">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-4">일시적인 오류가 발생했습니다</h1>
          <p className="text-muted-foreground">{fatalError}</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<KoreanLanding />} />
            <Route path="/ko" element={<KoreanLanding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
