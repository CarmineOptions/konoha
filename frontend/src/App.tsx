import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SubmitProposalModal from "./components/SubmitProposalModal";
import TreasuryStatus from "./components/TreasuryStatus";
import VotingPower from "./components/staking/VotingPower";
import Home from "./components/Home";
import CreateProposal from "./components/create-proposal";
import Proposal from "./components/Proposal";
import StakingPage from "./components/staking-page";
// import StatusTransfer from "./components/StatusTransfer";
// import VestingTable from "./components/VestingTable";

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Router>
      <Header />

      <SubmitProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <main className="flex flex-col items-center bg-main-bg min-h-screen py-16">
        <div className="w-full md:max-w-[50rem]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-proposal/" element={<CreateProposal />} />
            <Route
              path="/proposal/:id"
              element={<Proposal proposalId={0n} />}
            />
             <Route
              path="/staking"
              element={<StakingPage  />}
            />
            <Route path="/treasury" element={<TreasuryStatus />} />
            <Route path="/voting-power" element={<VotingPower />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
