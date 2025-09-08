import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ReplyPage = ({ isIOS }) => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("birthdayReplies") || "[]");
    setMessages(savedMessages);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: isIOS ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden mb-6 bg-white text-pink-600 px-4 py-2 rounded-full shadow-md flex items-center"
        >
          <span className="button-text flex items-center">
            <span className="mr-2">←</span>
            Kembali
          </span>
        </motion.button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
            💖 Pesan Cinta Dari Pacarmu 💖
          </h1>

          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400"
                >
                  <p className="text-pink-800">"{msg.message}"</p>
                  <p className="text-xs text-pink-500 mt-2 text-right">
                    {msg.date}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-pink-500 text-lg">
                Belum ada pesan cinta...
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ReplyPage;