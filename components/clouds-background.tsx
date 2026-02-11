"use client"

export function CloudsBackground() {
  return (
    <>
      {/* Soft pink gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-pink-100 via-pink-50 to-rose-50" />
      
      {/* Clouds Container */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Cloud 1 - Large, slow */}
        <div className="absolute top-10 -left-32 w-96 h-48 bg-white/40 rounded-full blur-3xl animate-float-slow" 
          style={{ 
            animation: "float-cloud 25s infinite ease-in-out",
            animationDelay: "0s"
          }} 
        />
        
        {/* Cloud 2 - Medium, medium speed */}
        <div className="absolute top-32 right-0 w-80 h-40 bg-white/30 rounded-full blur-3xl animate-float-slow"
          style={{
            animation: "float-cloud 30s infinite ease-in-out",
            animationDelay: "2s"
          }}
        />
        
        {/* Cloud 3 - Large, very slow */}
        <div className="absolute top-48 left-1/4 w-96 h-44 bg-white/35 rounded-full blur-3xl"
          style={{
            animation: "float-cloud 35s infinite ease-in-out",
            animationDelay: "4s"
          }}
        />
        
        {/* Cloud 4 - Small, fast */}
        <div className="absolute top-64 -right-40 w-72 h-36 bg-white/25 rounded-full blur-3xl"
          style={{
            animation: "float-cloud 28s infinite ease-in-out",
            animationDelay: "6s"
          }}
        />
        
        {/* Cloud 5 - Medium, slow */}
        <div className="absolute top-96 -left-48 w-80 h-40 bg-white/32 rounded-full blur-3xl"
          style={{
            animation: "float-cloud 32s infinite ease-in-out",
            animationDelay: "8s"
          }}
        />
      </div>

      <style>{`
        @keyframes float-cloud {
          0% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(30px) translateY(-10px);
          }
          50% {
            transform: translateX(60px) translateY(0);
          }
          75% {
            transform: translateX(30px) translateY(10px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
      `}</style>
    </>
  )
}
