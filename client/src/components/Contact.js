import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#EDF1D6]">
        <div className="w-full max-w-md mt-10 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h1 className="text-4xl font-bold mb-4 text-[#40513B] text-center">
            Contact Us
          </h1>
          <form className="mb-4">
            <div className="mb-6">
              <label
                className="block text-[#40513B] text-sm font-bold mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#40513B] leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-[#40513B] text-sm font-bold mb-2"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#40513B] leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-[#40513B] text-sm font-bold mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#40513B] leading-tight focus:outline-none focus:shadow-outline h-20"
                id="message"
                placeholder="Write your message here..."
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
