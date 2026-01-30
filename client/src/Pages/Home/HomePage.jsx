import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Search,
  TrendingUp,
  Database,
  Cpu,
  Globe,
  ChevronRight,
  BookOpen,
  TestTube,
  Rocket,
} from "lucide-react";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNavigateToPosts = () => {
    window.location.href = "/posts";
  };

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Advanced semantic search powered by AI to find exactly what you're looking for",
      gradient: "from-violet-500 to-purple-600",
      delay: "0ms",
    },
    {
      icon: TrendingUp,
      title: "Relevance Scoring",
      description:
        "Each search result comes with a relevance score to help you find the best matches",
      gradient: "from-cyan-500 to-blue-600",
      delay: "100ms",
    },
    {
      icon: Database,
      title: "Real-time Updates",
      description:
        "Instantly see new posts and updates as they happen with live data fetching",
      gradient: "from-fuchsia-500 to-pink-600",
      delay: "200ms",
    },
    {
      icon: Cpu,
      title: "Lightning Fast",
      description:
        "Optimized performance with debounced search and intelligent caching",
      gradient: "from-amber-500 to-orange-600",
      delay: "300ms",
    },
  ];

  const testScenarios = [
    {
      icon: BookOpen,
      title: "Browse All Posts",
      description:
        "View the complete collection of posts with beautiful card layouts",
      action: "View Posts",
      tag: "Browse",
    },
    {
      icon: Search,
      title: "Test Search",
      description: "Try searching for posts and see relevance scores in action",
      action: "Search Posts",
      tag: "Search",
    },
    {
      icon: TestTube,
      title: "Error Handling",
      description:
        "See how the app gracefully handles network errors and edge cases",
      action: "Test Errors",
      tag: "Test",
    },
    {
      icon: Rocket,
      title: "Performance",
      description:
        "Experience smooth animations, lazy loading, and optimized rendering",
      action: "Explore",
      tag: "Speed",
    },
  ];

  const stats = [
    { label: "Search Speed", value: "<500ms", icon: Zap },
    { label: "Relevance Accuracy", value: "98%", icon: TrendingUp },
    { label: "Uptime", value: "99.9%", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5"></div>
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139,92,246,0.15), transparent 50%)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_25%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-32 sm:pt-32 sm:pb-40">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-slate-900/80 backdrop-blur-xl border border-violet-500/30 rounded-full shadow-2xl shadow-violet-500/20 animate-fadeIn">
              <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Next-Gen Post Management
              </span>
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slideUp">
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                Discover Posts
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent leading-tight mt-2">
                Like Never Before
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl sm:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slideUp"
              style={{ animationDelay: "100ms" }}
            >
              Experience intelligent search, real-time updates, and a beautiful
              interface designed for the modern web
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp"
              style={{ animationDelay: "200ms" }}
            >
              <button
                onClick={handleNavigateToPosts}
                className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 flex items-center gap-3"
              >
                <span className="relative z-10">Explore Posts</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={handleNavigateToPosts}
                className="group border-2 border-slate-700 hover:border-violet-500/50 bg-slate-900/50 hover:bg-slate-800/50 backdrop-blur-xl text-slate-200 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <TestTube className="h-5 w-5 group-hover:text-violet-400 transition-colors" />
                <span>Test Features</span>
              </button>
            </div>

            {/* Stats Bar */}
            <div
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slideUp"
              style={{ animationDelay: "300ms" }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <stat.icon className="h-5 w-5 text-violet-400" />
                    <span className="text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built with cutting-edge technology to deliver an exceptional
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-violet-500/50 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/10 overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg mb-6`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Test Scenarios Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Test the Application
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Explore different scenarios and see the app in action
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testScenarios.map((scenario, index) => (
              <div
                key={index}
                onClick={handleNavigateToPosts}
                className="group cursor-pointer bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-violet-500/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/10 relative overflow-hidden"
              >
                {/* Tag */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                    {scenario.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4 p-3 bg-slate-800 rounded-xl w-fit group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-cyan-500 transition-all duration-300">
                  <scenario.icon className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                  {scenario.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {scenario.description}
                </p>

                {/* Action */}
                <div className="flex items-center gap-2 text-violet-400 font-semibold group-hover:gap-3 transition-all">
                  <span className="text-sm">{scenario.action}</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5"></div>

            <div className="relative">
              <div className="inline-flex p-4 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-3xl shadow-2xl mb-8 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <Rocket className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Dive into the world of intelligent post management and
                experience the future of content discovery
              </p>

              <button
                onClick={handleNavigateToPosts}
                className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-110 inline-flex items-center gap-3"
              >
                <span className="relative z-10">Launch Application</span>
                <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-slate-400 font-semibold"></span>
            </div>
            <p className="text-slate-500 text-sm">Powered by AI</p>
          </div>
        </footer>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
