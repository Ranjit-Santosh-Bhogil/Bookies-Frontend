import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { apiUrl } from "../../api/client";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Check, X } from "lucide-react";

const Exchange = () => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [tab, setTab] = useState("incoming");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get("/api/exchange/incoming").then(({ requests }) => setIncoming(requests || [])).catch(() => setIncoming([])),
      api.get("/api/exchange/outgoing").then(({ requests }) => setOutgoing(requests || [])).catch(() => setOutgoing([])),
    ]).finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleAccept = async (requestId) => {
    setActionLoading(requestId);
    try {
      await api.put(`/api/exchange/accept/${requestId}`);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (requestId) => {
    setActionLoading(requestId);
    try {
      await api.put(`/api/exchange/reject/${requestId}`);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const list = tab === "incoming" ? incoming : outgoing;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">Exchange requests</h1>
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("incoming")}
            className={`px-4 py-2 rounded-xl font-medium transition ${tab === "incoming" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-white/80 text-indigo-700 border border-indigo-200 hover:bg-indigo-50"}`}
          >
            Incoming
          </button>
          <button
            onClick={() => setTab("outgoing")}
            className={`px-4 py-2 rounded-xl font-medium transition ${tab === "outgoing" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-white/80 text-indigo-700 border border-indigo-200 hover:bg-indigo-50"}`}
          >
            Outgoing
          </button>
        </div>
        {loading ? (
          <p className="text-indigo-600/70">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-indigo-600/70">No {tab} requests.</p>
        ) : (
          <ul className="space-y-4">
            {list.map((req) => (
              <li key={req._id} className="border border-indigo-200/80 rounded-xl p-4 bg-white shadow-md flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-indigo-900">{req.bookId?.title}</p>
                  <p className="text-sm text-indigo-600/80">{req.bookId?.author}</p>
                  {tab === "incoming" && (
                    <p className="text-sm text-indigo-600/70 mt-1">
                      From: {req.requesterId?.name} ({req.requesterId?.university})
                    </p>
                  )}
                  {tab === "outgoing" && (
                    <p className="text-sm text-indigo-600/70 mt-1">
                      To: {req.ownerId?.name}
                    </p>
                  )}
                  {req.message && <p className="text-sm text-indigo-700/80 mt-1">&quot;{req.message}&quot;</p>}
                  <span className={`inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${req.status === "pending" ? "badge-requested" : req.status === "accepted" ? "badge-available" : "badge-exchanged"}`}>
                    {req.status}
                  </span>
                </div>
                {tab === "incoming" && req.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(req._id)}
                      disabled={actionLoading === req._id}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-teal-500 text-white font-medium disabled:opacity-60 hover:bg-teal-600 transition"
                    >
                      <Check size={18} /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      disabled={actionLoading === req._id}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl border-2 border-rose-300 text-rose-600 font-medium disabled:opacity-60 hover:bg-rose-50 transition"
                    >
                      <X size={18} /> Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Exchange;
