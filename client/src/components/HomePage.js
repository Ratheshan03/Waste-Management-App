import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import Footer from "../components/Footer"; // Import Footer
import image1 from "../assets/eco-poster.jpg";
import image2 from "../assets/ukk.jpg";
import image3 from "../assets/understanding-food-waste.png";
import image4 from "../assets/usd.png";
import image5 from "../assets/waste.jpg";
import image6 from "../assets/ass.jpg";
import image7 from "../assets/px2.jpg";
import image8 from "../assets/ddd.jpg";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#EDF1D6]">
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Food Waste Data from Around the World
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            image={image1}
            title="Food Waste per year"
            stat="30%"
            description="Over 30% of food is lost or wasted each year."
          />
          <StatsCard
            image={image2}
            title="Wasted Food Worth"
            stat="$230B"
            description="Boston Consulting Group (BCG) estimates this wasted food is worth $230 billion."
          />
          <StatsCard
            image={image3}
            title="Food Waste Increase"
            stat="33%"
            description="The level of food wasted globally is expected to rise by another third by 2030."
          />
          <StatsCard
            image={image4}
            title="Global Food Waste Cost"
            stat="$940B"
            description="One third of all food produced is lost or wasted –around 1.3 billion tonnes of food –costing the global economy close to $940 billion each year."
          />
          <StatsCard
            image={image5}
            title="Saves C02"
            stat="4.4 Million"
            description="Eliminating global food waste would save 4.4 million tonnes of C02 a year, the equivalent of taking one in four cars off the road."
          />
          <StatsCard
            image={image6}
            title="Fruit and Vegetables Produced"
            stat="3.7 Trillion"
            description="Almost half of all fruit and vegetables produced are wasted (that’s 3.7 trillion apples)."
          />
          <StatsCard
            image={image7}
            title="Feed Hungry People"
            stat="$870 Million"
            description="If one quarter of the food currently lost or wasted could be saved, it would be enough to feed 870 million hungry people."
          />
          <StatsCard
            image={image8}
            title="Wasting Food"
            stat="$166 Billion"
            description="$166 billion (retail value of preventable waste) is spent on the food we never eat"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
