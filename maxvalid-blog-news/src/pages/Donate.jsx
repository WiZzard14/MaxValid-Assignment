import { useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import PublicLayout from "../components/PublicLayout";

export default function Donate() {
  const [amount, setAmount] = useState("");

  const handleAmountClick = (val) => {
    setAmount(val);
  };

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-[#00a8ff] p-10 text-center text-white">
            <Heart size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Make a Donation</h2>
            <p className="text-white/80 max-w-lg mx-auto">Your contribution helps us continue our mission and make a real impact in the world.</p>
          </div>
          
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Select Amount</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {["10", "25", "50", "100"].map((val) => (
                    <button 
                      key={val} 
                      onClick={() => handleAmountClick(val)}
                      className={`py-3 border-2 rounded-xl font-bold transition-colors ${amount === val ? 'border-[#00a8ff] bg-[#00a8ff]/10 text-[#00a8ff]' : 'border-gray-200 text-gray-600 hover:border-[#00a8ff]/50'}`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 font-bold">$</span>
                  <input 
                    type="number" 
                    placeholder="Custom Amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff] font-bold text-gray-700" 
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50" />
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50" />
                  <input type="text" placeholder="Card Number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50" />
                    <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a8ff]/50" />
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-10 py-4 bg-[#00a8ff] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#0097e6] transition-colors" onClick={() => alert(amount ? `Donation of $${amount} Successful! (Demo)` : "Please enter an amount!")}>
              Donate Now
            </button>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
