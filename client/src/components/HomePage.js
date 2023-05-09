import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#EDF1D6]">
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Food Waste Data from Around the World
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
